import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import {observer,inject} from 'mobx-react'

import LogoWithTitileImg from './restack-logo.png'
import './app.less'


@inject('hello')
@withRouter
@observer
export default class App extends Component {

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
