import React from 'react'
import axios from 'axios'
import Rating from 'react-rating'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import BeerMatch from './BeerMatch'
import ReactMapboxGL, { Marker, ZoomControl } from 'react-mapbox-gl'
// import 'bulma'


const Map = ReactMapboxGL({ accessToken: process.env.MAPBOX_TOKEN })
class BurgersShow extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: { userRating: '', content: ''
      },
      errors: {}
    }
    this.normalisePrice = this.normalisePrice.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleDeleteBurger = this.handleDeleteBurger.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/burgers/${this.props.match.params.id}`)
      .then(res => this.setState({ burger: res.data }))
  }

  normalisePrice(price) {
    const priceResult = parseFloat(price).toFixed(2)
    return priceResult
  }

  handleChange(e) {
    const formData = {...this.state.formData, [e.target.name]: e.target.value}
    this.setState({formData})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/burgers/${this.props.match.params.id}/comments`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({burger: res.data, formData: {userRating: '', content: ''}}))
  }

  handleDeleteComment(e) {
    e.preventDefault()

    axios.delete(`/api/burgers/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({burger: res.data}))
  }

  handleDeleteBurger(e) {
    e.preventDefault()

    axios.delete(`/api/burgers/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/burgers/'))
  }

  render() {
    console.log(this.state.formData.userRating)
    if(!this.state.burger) return null
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
              <h2 className="title is-3 has-text-centered">
                <h3>User Rating:</h3>
                <Rating
                  emptySymbol= {<img src="https://i.imgur.com/931P2ih.png" className="image is-48x48"/>}
                  fullSymbol= {<img src="https://i.imgur.com/f00MSST.png" className="image is-48x48"/>}
                  fractions={2}
                  initialRating={this.state.burger.avgUserRating}
                  readonly={true}
                  quiet={false}
                />
                <h5>Based on {this.state.burger.totalUsers} ratings</h5>
              </h2>
              <hr />
              <h2 className="title is-3 has-text-centered">
                <h3>Our Rating:</h3>
                <Rating
                  emptySymbol= {<img src="https://i.imgur.com/931P2ih.png" className="image is-48x48"/>}
                  fullSymbol= {<img src="https://i.imgur.com/f00MSST.png" className="image is-48x48"/>}
                  fractions={2}
                  initialRating={this.state.burger.rating}
                  readonly={true}
                  quiet={false}
                />
              </h2>
              <hr />
              <div className="tile is-parent">
                <article className="tile is-child notification is-primary">
                  <p className="subtitle is-3">Find it at</p>
                  <p className="title is-2 has-text-dark"> {this.state.burger.restaurant.name}</p>
                  <p className="subtitle">{this.state.burger.restaurant.address}</p>
                  <div className="columns is-centered">
                    <div className="column has-text-centered">
                      <Map
                        className="map"
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                          height: '350px',
                          width: '350px'
                        }}
                        center = {[this.state.burger.restaurant.longitude, this.state.burger.restaurant.latitude]}
                        zoom = {[13]}
                        scrollZoom = {true}
                      >
                        <Marker
                          coordinates={[this.state.burger.restaurant.longitude, this.state.burger.restaurant.latitude]}
                          anchor="bottom">
                          <img src='https://i.imgur.com/WGtyz8g.png' width='100px' height='100px'/>
                        </Marker>
                        <ZoomControl
                          isEnabled = 'true' />

                      </Map>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div>
              <div className="tile main-show-container">
                <article className="tile is-child notification is-primary main-show-container-2">
                  <div className="burgervitalinfo">
                    <header className="title is-3">{this.state.burger.name}</header>

                    <p className="subtitle priceincard"><span className="has-text-weight-semibold">Price: </span> £ {this.normalisePrice(this.state.burger.price)}</p>
                    <p className="subtitle"> <span className="has-text-weight-semibold">Ingredients: </span>
                      <ul>{this.state.burger.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
                    </p>

                    <p className="subtitle"><span className="has-text-weight-semibold">Vegetarian: </span>
                      {(!!this.state.burger.isVegetarian || !!this.state.burger.isVegan) && <img src="https:/i.imgur.com/8RN8Why.png" className="icon"/>}
                      {(!this.state.burger.isVegetarian && !this.state.burger.isVegan) && <span
                        className="subtitle">No</span>} </p>

                    <p className="subtitle"><span className="has-text-weight-semibold">Vegan: </span>
                      {!this.state.burger.isVegan && <span className="subtitle">No</span>}
                      {!!this.state.burger.isVegan && <img src="https://i.imgur.com/8RN8Why.png" className="icon"
                      />}
                    </p>
                    <div className="buttons are-medium externalfeaturebuttons">
                      <div className="control">
                        <a className="button is-black is-fullwidth"  href={this.state.burger.restaurant.website} rel="noopener noreferrer" target="_blank">🍽Try it!</a>
                      </div>
                      <div className="control">
                        <span><BeerMatch/></span>
                      </div>
                    </div>
                    {Auth.isAuthenticated() && <div className="buttons is-center">
                      <Link
                        className="button editbutton"
                        to={`/burgers/${this.state.burger._id}/edit`}
                      >Edit</Link>
                      <button className="button deleteburgerbutton is-danger" onClick={this.handleDeleteBurger}>Delete</button>
                    </div>}
                  </div>
                </article>
              </div>
              <hr />
              <div className="burgersecondaryinfo">
                <div className="content">{this.state.burger.description}</div>
              </div>

              <div className="columns">
                <div className="column is-half">
                  {this.state.burger.comments.map(comment =>
                    <Comment
                      key={comment._id} {...comment} handledelete={this.handleDeleteComment}
                    />
                  )}
                </div>
              </div>
              {Auth.isAuthenticated() && <form className="formfield" onSubmit={this.handleSubmit}>
                <hr />
                <div className="field">
                  <label className="label">Comment</label>
                  <textarea
                    name="content"
                    className="textarea"
                    placeholder="Add a comment..."
                    onChange={this.handleChange}
                    value={this.state.formData.content}
                  />
                </div>

                <div className="field">
                  <label className="label">Rate out of 5</label>
                  <small>1</small>
                  <small className="five">5</small>
                  <input
                    id="sliderWithValue"
                    name="userRating"
                    className="is-success is-fullwidth is-large slider"
                    type="range"
                    min="1"
                    max="5"
                    onChange={this.handleChange}
                    value={this.state.formData.userRating}
                  />
                  {this.state.errors.userRating && <small className="help is
                  danger">{this.state.errors.userRating}</small>}
                </div>

                <button className="button is-info raterbutton">Submit</button>
              </form>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default BurgersShow
