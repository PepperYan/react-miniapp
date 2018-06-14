import Page from '../wechat'
import Comp from '../components/Comp1'
import './page.css'

class P extends Page {
  onClick(){
    console.log('test click')
    this.setData({ 
      arr: [
        [{id:3},{id:4}],
        [{id:3},{id:4}],
        [{id:3},{id:4}]
      ]
    })
  }
  render() {
    return (
      <div className="app" onClick={this.onClick} style={{posistion:"relative"}}>
        威武
        {
          this.state.arr.map(function(item,index){
            return item.map(function(item2){
              return <div>{item2.id}</div>
            })
          })
        }
      </div>
    )
  }
}