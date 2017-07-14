'use strict'
import React from 'react'
import  ReactDOM, {render} from 'react-dom'


//import ReactDOM from 'react-dom';


import { Provider } from 'react-redux'
import store from './store'

import Main from './components/Main'

render (
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('main')
)

// ReactDOM.render(
//    <Index />,
//   document.getElementById('main')
// );
