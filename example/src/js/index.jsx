import React,{Component} from 'react'
import { render } from 'react-dom'
import routes from './routes'
import stores from './stores'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'mobx-react'

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
