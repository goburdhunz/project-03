import React from 'react'
import axios from 'axios'
import Rating  from 'react-rating'
import 'bulma'

class BurgersShow extends React.Component {

  constructor() {
    super()
    this.state = {}
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
            <div className="column">
              <div className="card-image">
                <figure className="image3">
                  <img src={this.state.burger.image} alt={this.state.burger.name} />
                </figure>
              </div>
              <h2 className="title is-2">
                <Rating
                  emptySymbol= {<img src="https://i.imgur.com/B46NL0v.png" className="icon"/>}
                  fullSymbol= {<img src="https://i.imgur.com/lminuDH.png" className="icon"/>}
                  fractions={2}
                  initialRating={this.state.burger.rating}
                  readonly
                />
              </h2>
              <hr />
              <div className="tile is-parent">
                <article className="tile is-child notification is-primary ">
                  <p className="title">Find it at</p>
                  <a className="subtitle" href={this.state.burger.restaurant[0].website}> {this.state.burger.restaurant[0].name}</a>
                  <p className="subtitle">{this.state.burger.restaurant[0].address}</p>
                  <figure className="image is-4by3">
                    <img src="https://i.stack.imgur.com/mPsIw.png" />
                  </figure>
                </article>
              </div>
            </div>
            <div className="column">
              <div ClassName="tile is-ancestor">
                <article ClassName="tile is-child notification is-primary">
                  <div ClassName="content">
                    <header ClassName="title is-1">{this.state.burger.name}</header>
                    <p ClassName="subtitle"><span ClassName="has-text-weight-semibold">Price:</span>{this.state.burger.price}</p>
                    <p ClassName="subtitle"><span ClassName="has-text-weight-semibold">Ingredients:</span>{this.state.burger.ingredients[0]}</p>
                    <div ClassName="content">{this.state.burger.description}</div>
                  </div>
                </article>
              </div>
              <div className="columns">
                <div className="column">
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
                  <button className="button is-outlined">Book to try it!</button>
                  <button className="button is-outlined">Find a beer for a perfect match!</button>
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
