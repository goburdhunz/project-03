import React from 'react'
import { Link , withRouter} from 'react-router-dom'
import Login from '../auth/Login'
import Auth from '../../lib/Auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      tabSelected: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  logout() {
    Auth.removeToken()
    toast.success('Logged out successfully - Come back soon for more burger fun!!!')
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {

    const activeClass = (route) => {
      return this.props.location.pathname === route ? 'is-active' : null
    }

    return (
      <section className="hero is-primary is-bold is-small">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <Link to ="/" className="image is-128x128">
                  <img src="https://i.imgur.com/Hy4OAXr.png" alt="Logo"/>
                </Link>
                <a
                  role="button"
                  className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
                  onClick={this.toggleNavbar}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div className="container hero-body">
                <h1 className="title">
                 BurgerRator
                </h1>
                <h2 className="subtitle">
                 Burgers Rated by YOU
                </h2>
                <br/>
              </div>

              <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
                <div className="navbar-end">
                  {Auth.isAuthenticated() && <a onClick={this.logout} className="navbar-item ">Logout</a>}

                  {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">
                    <button className="button is-info registerbutton">Register</button>
                  </Link>}

                  <span className="navbar-item login-button">
                    <Login/>
                  </span>

                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-foot">
          <nav className="tabs is-boxed ">
            <div className="container">
              <ul>
                <li className={activeClass('/')}><Link to ="/">Home</Link></li>
                <li className={activeClass('/nominate')}>{Auth.isAuthenticated() &&<Link to ="/nominate">Nominate</Link>}</li>
                <li className={activeClass('/burgers')}><Link to ="/burgers">Browse</Link></li>
                <li className={activeClass('/about')}><Link to ="/about">About</Link></li>
              </ul>
            </div>
          </nav>
        </div>

      </section>
    )
  }

}

export default withRouter(Navbar)
