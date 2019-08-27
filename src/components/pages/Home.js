import React from 'react'
import Card from '../burgers/Card'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ReactMapboxGL, { Marker } from 'react-mapbox-gl'
import BeerMatch from '../burgers/BeerMatch'

const Map = ReactMapboxGL({ accessToken: process.env.MAPBOX_TOKEN })


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

        <div className="homepage-container">

          <div className="columns">
            <div className=" column top-burgers">
              <br/>
              <h1 className="title">Hungry for our top rated?</h1>
              <h2 className="subtitle is-a-5"><a href="/#/register">Join us</a> to vote for your top rated burger or nominate your own</h2>
              <div className="columns is-multiline">
                {this.state.burgers.map(burger =>
                  <div
                    key={burger._id}
                    className="column is-one-third-desktop"
                  >
                    <Link to={`/burgers/${burger._id}`}>
                      <Card
                        name={burger.name}
                        image={burger.image}
                        rating={burger.rating}
                        price={burger.price}
                        restaurant={burger.restaurant.name}
                        isVegetarian={burger.isVegetarian}
                        isVegan={burger.isVegan}/>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="side-map">
          <h2 className="subtitle ratedsub">Find our top rated burgers as voted by you</h2>
          <p>Use our interactive map to find the best burgers in town</p>
          <br/>
          <div className="mapgif">
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: '400px',
                width: '700px'
              }}
              center = {[-0.1240,51.5117]}
              zoom = {[10]}
              scrollZoom = {true}
            >

              {this.state.burgers.map((burger) => (
                <Marker
                  key={burger._id}
                  coordinates={[burger.restaurant.longitude, burger.restaurant.latitude]}
                  anchor="bottom">
                  <img src='https://i.imgur.com/WGtyz8g.png' width='30px' height='50px'/>
                </Marker>
              ))}
            </Map>
            <img className="burgervan" src="https://i.pinimg.com/originals/b9/80/7d/b9807d073046cad36c489bde61d8f34d.gif"/>
          </div>
        </div>


      </div>
    )
  }
}

export default Home
