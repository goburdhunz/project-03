import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Auth from '../../lib/Auth'

const SecureRoute = (props) => {
  if(Auth.isAuthenticated()) return <Route {...props} />

  toast.error('Please log in')

  return <Redirect to="/login?auth=true" />
}

export default SecureRoute
