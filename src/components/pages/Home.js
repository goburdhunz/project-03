import React from 'react'
import {Link} from 'react-router-dom'
import Card from '../burgers/Card'
import axios from 'axios'

class Home extends React.Component {
  constructor() {
    super()

    this.state = { burgers: [] }
  }

  componentDidMount() {
    axios.get('api/burgers')
      .then(res => this.setState({ burgers: res.data}))
    console.log(res.data)

  }

  render() {
    return (

      <div>
        <section className="hero is-primary is-bold is-medium">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <a className="navbar-item">
                    <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo"/>
                  </a>
                  <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div id="navbarMenuHeroA" className="navbar-menu">
                  <div className="navbar-end">
                    <a className="navbar-item">
                     Register
                    </a>
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
            </div>
          </div>

          <div className="hero-foot">
            <nav className="tabs">
              <div className="container">
                <ul>
                  <li className="is-active"><a>Home</a></li>
                  <li><a>Nominate</a></li>
                  <li><a>Browse</a></li>
                  <li><a>About</a></li>
                </ul>
              </div>
            </nav>
          </div>

        </section>
        <div className="columns">
          <div className="column">
            <h1 className="title">Top Rated</h1>
            <div className="container">
              <div className="columns is-multiline">
                {this.state.burgers.map(burger =>
                  <div
                    key={burger._id}
                    className="column is-half-tablet is-one-quarter-desktop"
                  >
                    <Link to={`/burgers/${burger._id}`}>
                      <Card name={burger.name} image={burger.image} rating={burger.rating} restaurant={burger.restaurant} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="column has-background-danger is-one-quarter">
            <h1 className="title">
              BurgerRator
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
