import React from 'react'
import { Link , withRouter, Route} from 'react-router-dom'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      tabSelected: false
    }

    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
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
                <Link to ="/" className="navbar-item">
                  <img src="https://i.imgur.com/uxpLh1c.png" alt="Logo"/>
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
              <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
                <div className="navbar-end">
                  <a onClick={this.logout} className="navbar-item is-bold">Logout</a>
                  <Link to="/register" className="navbar-item">Register</Link>
                  <span className="navbar-item">
                    <a className="button is-primary is-danger">
                      <span>Login</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
             BurgerRator
            </h1>
            <h2 className="subtitle">
             Burgers Rated by YOU
            </h2>
            <br/>
          </div>
        </div>

        <div className="hero-foot">
          <nav className="tabs is-boxed ">
            <div className="container">
              <ul>
                <li className={activeClass('/')}><Link to ="/">Home</Link></li>
                <li className={activeClass('/nominate')}><Link to ="/nominate">Nominate</Link></li>
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
