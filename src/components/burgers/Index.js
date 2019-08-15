import React from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Card from './Card'
import axios from 'axios'
import _ from 'lodash'
const animatedComponents = makeAnimated()

const ingredients = [
  { value: 'Ingredient 1', label: 'Ingredient 1' },
  { value: 'Ingredient 2', label: 'Ingredient 2' },
  { value: 'Ingredient 3', label: 'Ingredient 3' },
  { value: 'Ingredient 4', label: 'Ingredient 4' },
  { value: 'Ingredient 5', label: 'Ingredient 5' },
  { value: 'Ingredient 6', label: 'Ingredient 6' }
]

class BurgersIndex extends React.Component {
  constructor() {
    super()

    this.state = { burgers: [] }
    this.filterBurgers = this.filterBurgers.bind(this)
  }

  componentDidMount() {
    axios.get('api/burgers')
      .then(res => this.setState({ burgers: res.data}))
        console.log(res.data)
  }

  handleChangeIngredients(selectedIngredients) {
    this.setState({ selectedIngredients })
    const ingredients = selectedIngredients.map(ingredients => ingredients.value)
    const formData = { ...this.state.formData, ingredients: ingredients}
    this.setState({ formData })
    console.log(formData)
  }

  handleCheckbox(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.checked }
    this.setState({ formData })
  }

  handleChangePrice(e) {
    this.setState({ sortTerm: e.target.value })
  }

  handleKeyUp(e) {
    this.setState({ searchTerm: e.target.value })
  }

  filterBurgers() {
    const [field, order] = this.state.sortTerm.split('|')
    const sortedBurgers = _.orderBy(filterBurgers, [field], [order])
    return sortedBurgers
  }

  render() {
    const { selectedIngredients } = this.state
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <form>

          // SEARCH>
                <div className="field">
                  <div className="control">
                    <input placeholder="Search" className="input" onKeyUp={this.handleKeyUp}/>
                  </div>
                </div>

          // RATING
                <div className="field">
                  <label className="label">Rating (1 - 5)</label>
                  <input
                    name="rating"
                    className="input"
                    type="range"
                    min="1"
                    max="5"
                    //onChange={this.handleChange}
                  />
                </div>

          // INGREDIENTS
                <div className="field">
                  <label className="label">Ingredients</label>
                  <div className="control">
                    <Select
                      isMulti
                      isSearchable
                      name="ingredients"
                      className="basic-multi-select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={selectedIngredients}
                      onChange={this.handleChangeIngredients}
                      options={ingredients}
                    />
                  </div>
                </div>

          // VEGETARIAN
                <div className="field">
                  <label className="label">Vegetarian?</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="isVegetarian"
                    checked={this.state.formData.isVegetarian || false}
                    onChange={this.handleCheckbox}
                  />
                </div>
          //VEGAN
                <div className="field">
                  <label className="label">Vegan?</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="isVegan"
                    checked={this.state.formData.isVegan || false}
                    onChange={this.handleCheckbox}
                  />
                </div>
          // PRICE
                <div className="field">
                  <div className="select is-fullwidth">
                    <select onChange={this.handleChange}>
                      <option value="price|asc">Price Low first</option>
                      <option value="price|desc">Price High first</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="column">
              <div className="columns is-multiline">
                {this.state.filterBurgers().map(burger =>
                  <div
                    key={burger._id}
                    className="column is-half-tablet is-one-quarter-desktop"
                  >
                    <Link to={`/burgers/${burger._id}`}>
                      <Card name={burger.name} image={burger.image} rating={burger.rating} restaurant={burger.restaurant}/>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default BurgersIndex
