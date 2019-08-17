import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'

import { HashRouter, Route , Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import Register from './components/auth/Register'
import BurgersIndex from './components/burgers/Index'
import Navbar from './components/common/Navbar'
import New from './components/burgers/New'


class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar/>
        <Switch>
          <Route path="/burgers" component={BurgersIndex} />
          <Route path= "/register" component={Register}/>
          <Route path= "/nominate" component={New}/>
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
