import Page from './wechat'

class P extends Page {
  onClick(){console.log('test click')}
  render() {
    return (
      <div className="app" onClick={this.onClick} style={{posistion:"relative"}}>
        hello
      </div>
    )
  }
}