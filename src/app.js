import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'

import Home from './components/pages/Home'

class App extends React.Components {

<Route path "/" component={Home}/>
}

ReactDOM.render(
  <App />,
document.getElementById('root')
)
