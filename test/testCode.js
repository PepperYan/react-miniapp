const testClz = "Class A extends Page{}"

//测试标签attr
const testProps =  "class A extends App {"+
"render() {"+
  "return ("+
    '<div className="app">'+
    '<img className="logo" src={this.props.hello.msg}/>'+
    '{this.props.children}'+
    '{1+2}'+
    '</div>'+
  ')'+
'}'+
'}'

const testJSXEvent = "class A extends Component {"+
"onClick(){console.log('test click')}"+
"render() {"+
  "return ("+
    '<div className="app" onClick={this.onClick} style={{posistion:"relative"}}>'+
      '<img className="logo" src={this.props.hello.msg}/>'+
    '</div>'+
  ')'+
'}'+
'}'

//测试纯JSX编译
const testMap = "class A extends Component {"+
"constructor(props){ this.state = { users:[ {id:1}, {id:2} ] } }"+
"render() {"+
  "return ("+
  '<div className="app">'+
        '{ this.state.users.map(function(user){'+
             'return <div>{user.id}</div>'+
          '})'+
        '}'+
      '</div>'+
  ')'+
'}'+
'}'

//测试纯JSX编译
const testMapCycle = "class A extends Component {"+
"constructor(props){ this.state = { users:[ [{id:1}, {id:2}], [{id:1}, {id:2}] ] } }"+
"render() {"+
  "return ("+
  '<div className="app">'+
        '{ this.state.users.map(function(us){'+
            'return us.map(function(user){'+
              'return <div>{user.id}</div>'+
            '})'+
          '})'+
        '}'+
      '</div>'+
  ')'+
'}'+
'}'

const testMapCycleBigger = "class A extends Component {"+
"constructor(props){ this.state = { users:[[[]]] } }"+
"render() {"+
  "return ("+
  '<div className="app">'+
        '{ this.state.users.map(function(us){'+
            'return us.map(function(user){'+
              'return user.map(function(u){ return <div>{u.id}</div>})'+
            '})'+
          '})'+
        '}'+
      '</div>'+
  ')'+
'}'+
'}'

// 
var testJSXWindow = "class A extends Component {"+
  'static window = { miniappConfig:true };'+
  "render() {"+
    "return ("+
      '<div className="app">'+
      '</div>'+
    ')'+
  '}'+
'}'

//
var testJSX = "class A extends Component {"+
  "render() {"+
    "let { msg } = this.props.hello"+
    "return ("+
    '<div className="app">'+
        '<img className="logo" src={LogoWithTitileImg}/>'+
        '<div className="helloworld">'+
        '<h1>Welcome to Restackx for React</h1>'+
          "Let's begin in <code>demo/index.jsx</code>, change the <i>{msg}</i>."+
          '</div>'+
        '</div>'+
    ')'+
  '}'+
'}'

module.exports = {
  testClz,
  testJSX,
  testProps,
  testMap,
  testMapCycle,
  testMapCycleBigger,
  testJSXWindow,
  testJSXEvent
}