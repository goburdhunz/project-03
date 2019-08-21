import React from 'react'
import {Link} from 'react-router-dom'


class About extends React.Component {

  render() {
    return (
      <div className="container">
        <header className="title is-1">Meet the team behind BurgerRator!</header>
        <div className="columns">
          <div className="column">
            <div className="box">
              <figure className="image">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Ania" />
              </figure>
              <h3 className="subtitle is-3 is-primary">Ania Kubow</h3>
              <Link to=""><img src="https://i.imgur.com/Y0Mskai.png" alt="GithubLogo"/></Link>
              <Link to=""><img src="https://i.imgur.com/2IsOkIY.png" alt="GithubLogo"/></Link>
            </div>
          </div>
          <div className="column">
          </div>
          <div className="column">
          </div>
          <div className="column">
          </div>
        </div>
      </div>
    )
  }
}
export default About
