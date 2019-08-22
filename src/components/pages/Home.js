import React from 'react'
import Card from '../burgers/Card'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ReactMapboxGL, { Marker } from 'react-mapbox-gl'

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
            <div className=" column is-two-thirds-tablet is-two-thirds-widescreen is-two-thirds-desktop top-burgers">
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
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="column side-map">
              <h2 className="subtitle">Find our top rated burgers as voted by you</h2>
              <hr className="homepagebreak"/>
              <p>Use our interactive map to find the best burgers in town</p>
              <br/>
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: '400px',
                  width: '400px'
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
                    <img src='https://i.imgur.com/WGtyz8g.png' width='50px' height='50px'/>
                  </Marker>
                ))}
              </Map>



            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Home
