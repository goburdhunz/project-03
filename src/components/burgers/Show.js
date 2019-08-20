import React from 'react'
import axios from 'axios'
import Rating  from 'react-rating'
import Comment from '../common/Comment'
import Auth from '../../lib/Auth'

class BurgersShow extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: { rating: '', content: ''}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/burgers/${this.props.match.params.id}`)
      .then(res => this.setState({ burger: res.data }))
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
      .then(res => this.setState({burgers: res.data, formData: {rating: '', content: ''}}))
  }

  handleDelete(e) {
    e.preventDefault()

    axios.delete(`/api/burgers/${this.props.match.params.id}/comments/${e.target.id}`, {
      headers: {Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({burgers: res.data}))
  }





  render() {
    console.log(this.state.formData)
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
                  <a className="subtitle is-2" href={this.state.burger.restaurant.website} rel="noopener noreferrer" target="_blank"> {this.state.burger.restaurant.name}</a>
                  <p className="subtitle">{this.state.burger.restaurant.address}</p>
                  <figure className="image is-4by3">
                    <img src="https://i.stack.imgur.com/mPsIw.png" />
                  </figure>
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
                  {this.state.burger.comments.map(comment =>
                    <Comment key={comment._id} {...comment} handledelete={this.handleDelete}/>
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
                  <label className="label">Rating (1-5)</label>
                  <input
                    name="rating"
                    className="input"
                    type="range"
                    min="1"
                    max="5"
                    onChange={this.handleChange}
                    value={this.state.formData.rating}
                  />
                </div>

                <button className="button is-info">Submit</button>
              </form>}


            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default BurgersShow
