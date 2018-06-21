import Component from '../wechat'

class Comp extends Component {
  // static defaultProps = {
  //   name : {
  //     type: String,
  //     value: 'default value'
  //   }
  // }
  render(){
    return <div>组件</div>
  }
}

Comp.defaultProps = {
  name : {
    type: String,
    value: 'default value'
  }
}