# react-miniapp

[![Build Status](https://travis-ci.org/PepperYan/react-miniapp.svg?branch=master)](https://travis-ci.org/PepperYan/react-miniapp)

## 快速开始
1. 安装依赖
```
cd react-miniapp
yarn
```
2. 打开微信开发者工具, 选择小程序, 导入build文件夹
3. 开发React(还在demo阶段,现在会直接编译src目录)
4. 打包代码
```
npm run dev
```

##支持列表
- [x] constructor 转换data
- [x] 页面
  - [x] jsx模板转换
    - [x] render函数对map函数多层嵌套支持
    - [x] tag支持
    - [x] block支持
  - [x] 模板提取
  - [x] js methods 支持
  - [x] 页面json配置支持
- [x] App
- [ ] 组件化
   - [x] tag属性的支持
   - [ ] component
      - [x] defaultProps 转换properties
      - [ ] 组件children
      - [ ] behaviors
   - [ ] 无状态组件
      - [ ] 通过外部引入无状态组件
      - [ ] 页面内组件引入无状态组件
      - [ ] 页面内箭头函数无状态组件
      - [ ] 无状态组件的属性设置问题
   - [ ] 组件间通信
- [ ] 状态管理
   - [ ] redux
   - [ ] redux-saga
   - [ ] redux-thunk
- [ ] npm包支持
- [x] wxss支持
  - [x] css import
  - [x] css合并
  - [x] wxss输出
- [x] 標準化plugin 2018.6.8
- [ ] ui库 
- [x] 单元测试
- [x] 项目配置
- [x] 工具 watch (增量编译)
- [x] 拷贝资源目录

### 本项目已被正美纳入anu
(anu连接)[https://github.com/RubyLouvre/anu/tree/master/packages/render/miniapp]

## Licences
MIT