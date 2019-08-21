import React from 'react'
import ReactDOM from 'react-dom'

import { ToastContainer } from 'react-toastify'

import './style.scss'


import { HashRouter, Route , Switch} from 'react-router-dom'

import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import BurgersIndex from './components/burgers/Index'
import BurgersShow from './components/burgers/Show'
import BurgersEdit from './components/burgers/Edit'
import Navbar from './components/common/Navbar'
import New from './components/burgers/New'
import './style.scss'
import SecureRoute from './components/common/SecureRoute'


class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <ToastContainer position="top-center" hideProgressBar={true} />
        <Navbar/>
        <Switch>

          <SecureRoute path="/burgers/:id/edit" component={BurgersEdit} />
          <SecureRoute path= "/nominate" component={New}/>
          <Route path="/burgers/:id" component={BurgersShow} />
          <Route path= "/nominate" component={New}/>

          <Route path="/burgers" component={BurgersIndex} />
          <Route path= "/register" component={Register}/>
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
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
