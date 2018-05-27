const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve')
const rBabel =  require('rollup-plugin-babel');
const chalk = require('chalk').default;
const path = require('path');
const wt = require('wt');
const fs = require('fs-extra');
const miniappPlugin = require('../packages/react-miniapp-tranformation-plugin');
const transform = require('./transform').transform;
const postcss = require('rollup-plugin-postcss-miniapp')

const ignoreStyles = function(){
  return  {
    visitor:{
      ImportDeclaration:{
        enter(path,{ opts }){
          const source = path.node.source.value
          if(/.css/.test(source)){
            path.remove();
          }
        }
      }
    }
  }
}


class Parser {
  constructor(tPath){
    this.path = tPath;
    this.inputOptions = {
      input: path.resolve(this.path),
      plugins: [
        resolve(),
        postcss({
        }),
        rBabel({
          exclude: ['node_modules/**'],
          babelrc: false,
          runtimeHelpers: true,
          presets: ['@babel/preset-react'],
          plugins: [ignoreStyles,'@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
        }),
      ]
    }
    this.output = path.resolve('./build');
  }

  async parse(){
    const bundle = await rollup.rollup(this.inputOptions);
    const modules = bundle.modules.map(({ id, dependencies, originalCode, code }) => {
      if (/rollup/.test(id)) return //忽略 rollupPluginBabelHelpers
      return {
          id: id,
          code: originalCode,
          babeled: code,
          dependencies: dependencies.filter(d => {
              if (!/rollup/.test(d)) return d
          })
      }
    });
    const p = modules.map(m => {
      if (m) {
          return this.codegen.call(this, m.id, m.dependencies, m.code, m.babeled)
      }
    })

    await Promise.all(p)
  }

  async codegen(id, dependencies, code, babeled) {
    let srcPath = id.replace(path.resolve(__dirname,'../src'), '');
    if (/node_modules/.test(srcPath)) {
      srcPath = srcPath.replace(path.resolve('node_modules'), '')
      srcPath = `nodeModules${srcPath}`
    }
    const destPath = path.join(this.output, srcPath)
    if (/wechat.js/.test(destPath)) return
    await fs.ensureFile(path.resolve(destPath));
    const output = transform(code, id, destPath, dependencies)
    const srcBasePath = id.replace('.js', '')
    const basePath = destPath.replace('.js', '')
    if (/Page|App|Component/.test(output.type)) {
      fs.writeFile(destPath, output.js, () => {})
      fs.writeFile(basePath + '.json', JSON.stringify(output.json), () => {})
    }
    if (/Page|Component/.test(output.type)) {
      fs.writeFile(basePath + '.wxml', output.wxml, () => {})
      fs.copyFile(srcBasePath + '.css', basePath + '.wxss', () => {})
    }
  }

  watch(dir) {
    const watcher = wt.watch([dir])
    watcher.on('all', info => {
        logger.warn(`文件变化: ${info.path} 重新编译`)
        const p = info.path
        if (/.js|.jsx/.test(p)) {
            //暂时不编译css
            this.outputOptions = { ...this.outputOptions, input: p }
        }
        this.parse()
    })
  }
}

async function build() {
  try {
      const parser = new Parser('./src/App.js')
      await parser.parse()
      // await parser.copyRes('./temple')
      // parser.watch('./src')
  } catch (e) {
      console.log(chalk.redBright(e))
      console.log(e)
  }
}

build()