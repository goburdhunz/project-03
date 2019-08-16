import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'

import { HashRouter, Route , Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import BurgersIndex from './components/burgers/Index'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/burgers" component={BurgersIndex} />
          <Route path= "/" component={Home}/>
        </Switch>
      </HashRouter>
    )
  }



}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
