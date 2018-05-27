import Page from '../wechat'
import './page.css'

class P extends Page {
  onClick(){console.log('test click')}
  render() {
    return (
      <div className="app" onClick={this.onClick} style={{posistion:"relative"}}>
        hello1321321
      </div>
    )
  }
}