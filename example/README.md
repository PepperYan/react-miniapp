# 原型项目 (boilerplate)


## 目录介绍

```

项目
  |_ config
  |     |_ dev.js  #开发配置
  |     |_ prod.js  #生产配置
  |     |_ webpack  #自定义webpack配置(optional)
  |           |_ webpack.dev.config.js
  |           |_ webpack.prod.config.js
  |_src #源码目录
  |  |_index.js #应用入口
  |  |_routes.js #路由配置
  |  |_stores.js #store加载器
  |_package.json
  |_README.md
  |_template.html #基础html模板

```

### 配置

#### webpack
*注意*
当需要自定义**webpack**配置时, 需要添加webpack目录, 并且在目录下**必须**添加 `webpack.dev.config.js`以及`webpack.prod.config.js`作为配置加载.

#### cli配置
默认提供两种环境的cli配置, 分别是`dev.js`以及`prod.js`,详细用法参考cli文档





