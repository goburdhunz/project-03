import React from 'react'
import ReactDOM from 'react-dom'

import { ToastContainer } from 'react-toastify'

import './style.scss'


import { HashRouter, Route , Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import Register from './components/auth/Register'
import BurgersIndex from './components/burgers/Index'
import BurgersShow from './components/burgers/Show'
import Navbar from './components/common/Navbar'
import New from './components/burgers/New'
import './style.scss'
import SecureRoute from './components/common/SecureRoute'
// import SecureRoute from './components/common/SecureRoute'

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Navbar/>
        <ToastContainer position="bottom-right" hideProgressBar={true} />
        <Switch>

          <SecureRoute path= "/nominate" component={New}/>

          <Route path="/burgers/:id" component={BurgersShow} />
          <Route path= "/nominate" component={New}/>

          <Route path="/burgers" component={BurgersIndex} />
          <Route path= "/register" component={Register}/>
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
