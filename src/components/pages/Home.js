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
    axios.get('api')
      .then(res => this.setState({ burgers: res.data}))

  }

  render() {
    console.log(this.state.burgers)
    return (

      <div>

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
                    <Card
                      name={burger.name}
                      image={burger.image}
                      rating={burger.rating}
                      restaurant={burger.restaurant[0].name}
                    />
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
