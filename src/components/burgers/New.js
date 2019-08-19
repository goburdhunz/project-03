import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

import 'pretty-checkbox'


class New extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        restaurant: {},
        ingredients: []
      },
      errors: {}

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRestaurantChange = this.handleRestaurantChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleIngredientCheckbox = this.handleIngredientCheckbox.bind(this)
  }


  handleIngredientCheckbox(e) {
    const ingredients = [ ...this.state.formData.ingredients ]
    if(e.target.checked) {
      ingredients.push(e.target.name)
    } else {
      const index = ingredients.indexOf(e.target.name)
      ingredients.splice(index, 1)
    }

    const formData = { ...this.state.formData, ingredients }
    this.setState({ formData })
  }


  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData})
  }

  handleRestaurantChange(e) {
    const restaurant = { ...this.state.formData.restaurant, [e.target.name]: e.target.value }
    const formData = { ...this.state.formData, restaurant }
    this.setState({ formData })
  }

  handleCheckbox(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.checked }
    this.setState({ formData })
  }



  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/burgers', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/burgers'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  render() {
    return (
      <section className="section">
        <div className="container">

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                placeholder="eg: The Cheeesiest Cheesebuger"
                value={this.state.formData.name || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>

            <div className="field">
              <label className="label">Burger Image</label>
              <input
                className="input"
                name="image"
                placeholder="eg: https://istockphoto.com/photos/double-cheese-burger-picture.png"
                onChange={this.handleChange}
              />
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>

            <label className="label">Ingredients</label>
            <div className="field ingredients">
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Beef"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Beef</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Chicken"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Chicken</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Cheese"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Cheese</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Tomato"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Tomato</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Lettuce"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Lettuce</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Gherkin"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Gherkin</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Onion"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Onion</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Jalapeños"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Jalapeños</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Bacon"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Bacon</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Steak"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Steak</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Green pepper"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Green pepper</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Gravy"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Gravy</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="BBQ Sauce"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>BBQ Sauce</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Bun"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Bun</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Brioche bun"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Brioche</label>
                  </div>
                </div>
              </div>
              <div className="option">
                <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                  <input
                    type="checkbox"
                    name="Weird & Wonderful"
                    onChange={this.handleIngredientCheckbox}
                  />
                  <div className="state p-warning">
                    <label>Weird & Wonderful</label>
                  </div>
                </div>
              </div>

              {this.state.errors.ingredients && <small className="help is-danger">{this.state.errors.ingredients}</small>}
            </div>




            <div className="field">
              <label className="label">Vegeterian?</label>
              <input
                className="checkbox"
                type="checkbox"
                name="isVegetarian"
                checked={this.state.formData.isVegetarian || false}
                onChange={this.handleCheckbox}
              />
              {this.state.errors.isVegetarian && <small className="help is-danger">{this.state.errors.isVegetarian}</small>}
            </div>

            <div className="field">
              <label className="label">Vegan?</label>
              <input
                className="checkbox"
                type="checkbox"
                name="isVegan"
                checked={this.state.formData.isVegan || false}
                onChange={this.handleCheckbox}
              />
              {this.state.errors.isVegan && <small className="help is-danger">{this.state.errors.isVegan}</small>}
            </div>

            <div className="field">
              <label className="label">Price</label>
              <input
                className="input"
                type="number"
                name="price"
                placeholder="eg: £5.60"
                value={this.state.formData.price || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.price && <small className="help is-danger">{this.state.errors.price}</small>}
            </div>

            <div className="field">
              <label className="label">Description</label>
              <input
                className="textarea"
                name="description"
                placeholder="eg: This burger is made from 100% Angus beef with Stilton Cheese and a luxurious slather of mayonnaise and mustard. It is complimented by a generous layer of pickles and fied onions."
                value={this.state.formData.description || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
            </div>

            <div className="field">
              <label className="label">Restaurant</label>
              <input
                className="input"
                name="name"
                placeholder="eg: The Burger Joint"
                value={this.state.formData.restaurant.name || ''}
                onChange={this.handleRestaurantChange}
              />
              {this.state.errors.restaurant && <small className="help is-danger">{this.state.errors.restaurant}</small>}
            </div>

            <div className="field">
              <label className="label">Address</label>
              <input
                className="input"
                name="address"
                placeholder="eg: 56 Lettuce street, WC1 4TT"
                value={this.state.formData.restaurant.address || ''}
                onChange={this.handleRestaurantChange}
              />
              {this.state.errors.address && <small className="help is-danger">{this.state.errors.address}</small>}
            </div>

            <div className="field">
              <label className="label">Website</label>
              <input
                className="input"
                name="website"
                placeholder="eg: www.theburgerjoint.com"
                value={this.state.formData.restaurant.website || ''}
                onChange={this.handleRestaurantChange}
              />
              {this.state.errors.website && <small className="help is-danger">{this.state.errors.website}</small>}
            </div>

            <button className="button">Submit</button>
          </form>
        </div>
      </section>
    )
  }



}

export default New
