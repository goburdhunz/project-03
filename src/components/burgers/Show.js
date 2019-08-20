import React from 'react'
import axios from 'axios'
import Rating  from 'react-rating'
import ReactMapboxGL, { Marker, ZoomControl } from 'react-mapbox-gl'
import 'bulma'

const Map = ReactMapboxGL({ accessToken: process.env.MAPBOX_TOKEN })

class BurgersShow extends React.Component {

  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`/api/burgers/${this.props.match.params.id}`)
      .then(res => this.setState({ burger: res.data }))
  }

  render() {
    if(!this.state.burger) return null
    console.log(this.state.burger)
    return(
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-half has-text-centered">
              <div className="card-image">
                <figure className="image3">
                  <img src={this.state.burger.image} alt={this.state.burger.name} />
                </figure>
              </div>
              <h2 className="title is-2 has-text-centered">
                <Rating
                  emptySymbol= {<img src="https://i.imgur.com/931P2ih.png" className="image is-48x48"/>}
                  fullSymbol= {<img src="https://i.imgur.com/f00MSST.png" className="image is-48x48"/>}
                  fractions={2}
                  initialRating={this.state.burger.rating}
                  readonly
                />
              </h2>
              <hr />
              <div className="tile is-parent">
                <article className="tile is-child notification is-primary ">
                  <p className="title ">Find it at</p>
                  <a className="subtitle is-2" href={this.state.burger.restaurant[0].website} rel="noopener noreferrer" target="_blank"> {this.state.burger.restaurant[0].name}</a>
                  <p className="subtitle">{this.state.burger.restaurant[0].address}</p>

                  <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                      height: '350px',
                      width: '350px'
                    }}
                    center = {[this.state.burger.restaurant[0].longitude, this.state.burger.restaurant[0].latitude]}
                    zoom = {[13]}
                    scrollZoom = {true}
                  >
                    <Marker
                      coordinates={[this.state.burger.restaurant[0].longitude, this.state.burger.restaurant[0].latitude]}
                      anchor="bottom">
                      <img src='https://i.imgur.com/WGtyz8g.png' width='100px' height='100px'/>
                    </Marker>
                    <ZoomControl
                      isEnabled = 'true' />

                  </Map>


                </article>
              </div>
            </div>
            <div className="column">
              <div className="tile is-ancestor">
                <article className="tile is-child notification is-primary">
                  <div className="content">
                    <header className="title is-1">{this.state.burger.name}</header>
                    <p className="subtitle"><span className="has-text-weight-semibold">Price: </span> £ {this.state.burger.price}</p>
                    <p className="subtitle"><span className="has-text-weight-semibold">Ingredients:</span>
                      {this.state.burger.ingredients.map(ingredient => ' ' + ingredient + ',')}</p>
                    <p className="subtitle"><span className="has-text-weight-semibold">Vegetarian: </span>
                      {(!!this.state.burger.isVegetarian || !!this.state.burger.isVegan) && <img src="https://i.imgur.com/8RN8Why.png" className="icon"/>}
                      {(!this.state.burger.isVegetarian && !this.state.burger.isVegan) && <span className="subtitle">No</span>} </p>
                    <p className="subtitle"><span className="has-text-weight-semibold">Vegan: </span>
                      {!this.state.burger.isVegan && <span className="subtitle">No</span>}
                      {!!this.state.burger.isVegan && <img src="https://i.imgur.com/8RN8Why.png" className="icon"/>} </p>
                    <div className="subtitle">{this.state.burger.description}</div>
                  </div>
                </article>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="tile is-parent">
                    <article className="media tile is-child notification">
                      <div className="media-content">
                        <div className="content">
                          <p>
                            <strong>username</strong>
                            {' '}
                            <small>date created</small>
                            <br />
                            comment comment comment comment
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
                <div className="column">
                  <div className="buttons are-medium">
                    <div className="control">
                      <button className="button is-primary is-fullwidth">Book to try it!</button>
                    </div>
                    <div className="control">
                      <button className="button is-primary is-fullwidth">Find a beer for a perfect match!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default BurgersShow
