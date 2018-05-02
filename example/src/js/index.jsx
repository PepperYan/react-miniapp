import React,{Component} from 'react'
import { render } from 'react-dom'
import routes from './routes'
import stores from './stores'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'mobx-react'


// import Transformer from '../../../src/transform'

const code = ```
class A extends Component {

  render() {
    let { msg } = this.props.hello

    return (
      <div className="app">
        <img className="logo" src={LogoWithTitileImg}/>
        <div className="helloworld">
          <h1>Welcome to Restackx for React</h1>
          Let's begin in <code>demo/index.jsx</code>, change the <i>{msg}</i>.
        </div>
      </div>
    )
  }
}
```




function App(){
  return (
    <BrowserRouter>
      <Provider {...stores}>
        {routes}
      </Provider>
    </BrowserRouter>
  )
}

const container = document.getElementById('container');
render(
  <App />,
  container
)

if(module.hot){
  module.hot.accept('./routes', () => {
    render(
      <App />,
      container
    )
  });
}
