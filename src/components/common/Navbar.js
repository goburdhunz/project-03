import React from 'react'
import { Link , withRouter} from 'react-router-dom'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false
    }
  }


  render() {
    return (
      <section className="hero is-primary is-bold is-small">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <Link to ="/" className="navbar-item">
                  <img src="https://i.imgur.com/uxpLh1c.png" alt="Logo"/>
                </Link>
                <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroA" className="navbar-menu">
                <div className="navbar-end">
                  <Link to ="/register" className="navbar-item">
                   Register
                  </Link>
                  <span className="navbar-item">
                    <a className="button is-primary is-inverted">
                      <span className="icon">
                        <i className="fab fa-github"></i>
                      </span>
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
                <li className="is-active"><Link to ="/">Home</Link></li>
                <li><a>Nominate</a></li>
                <li><Link to ="/burgers">Browse</Link></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </nav>
        </div>

      </section>
    )
  }

}

export default withRouter(Navbar)
