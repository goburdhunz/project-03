import React from 'react'
import axios from 'axios'

import Select from 'react-select'

const ingredients = [
  { label: 'Beef', value: 'Beef' },
  { label: 'Chicken', value: 'Chicken' },
  { label: 'Cheese', value: 'Cheese' },
  { label: 'Tomato', value: 'Tomato' },
  { label: 'Lettuce', value: 'Lettuce' },
  { label: 'Gherkin', value: 'Gherkin' },
  { label: 'Onion', value: 'Onion' },
  { label: 'Jalapeños', value: 'Jalapeños' },
  { label: 'Bacon', value: 'Bacon' },
  { label: 'Bun', value: 'Bun' },
  { label: 'Steak', value: 'Steak' },
  { label: 'Green pepper', value: 'Green pepper' },
  { label: 'Gravy', value: 'Gravy' },
  { label: 'BBQ sauce', value: 'BBQ sauce' },
  { label: 'Brioche bun', value: 'Brioche bun' }
]

class New extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleIngredientChange = this.handleIngredientChange.bind(this)
    this.getSelectedIngredients = this.getSelectedIngredients.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData})
  }

  handleCheckbox(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.checked }
    this.setState({ formData })
  }

  handleIngredientChange(selectedIngredients) {
    const formData = { ...this.state.formData, ingredients: (selectedIngredients || []).map(option => option.value) }
    this.setState({ formData })
  }

  getSelectedIngredients() {
    return ingredients.filter(ingredient => (this.state.formData.ingredients || []).includes(ingredient.value))
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/burgers', this.state.formData)
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
                value={this.state.formData.image || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>

            <div className="field">
              <label className="label">Ingredients</label>
              <Select
                name="ingredients"
                options={ingredients}
                isMulti
                onChange={this.handleIngredientChange}
              />
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
                name="restaurant"
                placeholder="eg: The Burger Joint"
                value={this.state.formData.restaurant || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.restaurant && <small className="help is-danger">{this.state.errors.restaurant}</small>}
            </div>

            <div className="field">
              <label className="label">Address</label>
              <input
                className="input"
                name="address"
                placeholder="eg: 56 Lettuce street, WC1 4TT"
                value={this.state.formData.address || ''}
                onChange={this.handleChange}
              />
              {this.state.errors.address && <small className="help is-danger">{this.state.errors.address}</small>}
            </div>

            <div className="field">
              <label className="label">Website</label>
              <input
                className="input"
                name="website"
                placeholder="eg: www.theburgerjoint.com"
                value={this.state.formData.website || ''}
                onChange={this.handleChange}
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
