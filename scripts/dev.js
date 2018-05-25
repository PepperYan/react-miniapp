const roll = require('rollup');
const miniappPlugin = require('../src/plugins/react-miniapp-tranformation-plugin');

class Parser {
  constructor(tPath){
    this.path = tPath;
    this.outputOptions = {
      input: srcPath(this.path),
      plugins: [
          rpResolve(),
          rollup_babel({
              exclude: 'node_modules/**',
              babelrc: false,
              presets: ['@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-proposal-class-properties']
          })
      ]
    }
  }
}