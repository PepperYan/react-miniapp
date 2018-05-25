import App from './wechat'

class A extends App {
  onClick(){console.log('test click')}
  render() {
    return (
      <div className="app" onClick={this.onClick} style={{posistion:"relative"}}>
        <img className="logo" src={this.props.hello.msg}/>
      </div>
    )
  }
}