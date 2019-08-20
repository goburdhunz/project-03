import React from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Card from './Card'
import axios from 'axios'
import _ from 'lodash'
const animatedComponents = makeAnimated()

const ingredients = [
  { value: 'Beef', label: 'Beef' },
  { value: 'Chicken', label: 'Chicken' },
  { value: 'Cheese', label: 'Cheese' },
  { value: 'Tomato', label: 'Tomato' },
  { value: 'Lettuce', label: 'Lettuce' },
  { value: 'Gherkin', label: 'Gherkin' },
  { value: 'Onion', label: 'Onion' },
  { value: 'Jalapenos', label: 'Jalapeños' },
  { value: 'Bacon', label: 'Bacon' },
  { value: 'Steak', label: 'Steak' },
  { value: 'Green pepper', label: 'Green pepper' },
  { value: 'Mushroom', label: 'Mushroom' },
  { value: 'Gravy', label: 'Gravy' },
  { value: 'Bun', label: 'Bun' },
  { value: 'Brioche', label: 'Brioche' },
  { value: 'BBQ Sauce', label: 'BBQ Sauce' },
  { value: 'Ketchup', label: 'Ketchup' },
  { value: 'Mustard', label: 'Mustard' },
  { value: 'Mayonnaise', label: 'Mayonnaise' }
]

class BurgersIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      filterData: {
        searchTerm: '',
        searchTermIng: '',
        sortTerm: 'price|asc',
        ingredients: []
      },
      burgers: []
    },
    this.filterBurgers = this.filterBurgers.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleKeyUpIngredients = this.handleKeyUpIngredients.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  componentDidMount() {
    axios.get('/api/burgers')
      .then(res => this.setState({ burgers: res.data}))
  }

  handleChangeIngredients(selectedIngredients) {
    const ingredients = selectedIngredients.map(ingredients => ingredients.value)
    const filterData = { ...this.state.filterData, ingredients: ingredients}
    this.setState({ filterData })
    console.log(filterData)
  }

  handleKeyUp(e) {
    const filterData = { ...this.state.filterData, searchTerm: e.target.value }
    this.setState({ filterData })
  }

  handleKeyUpIngredients(e) {
    const filterData = { ...this.state.filterData, searchTermIng: e.target.value }
    this.setState({ filterData })
  }

  handleCheckbox(e) {
    const filterData = { ...this.state.filterData, [e.target.name]: e.target.checked }
    this.setState({ filterData })
  }

  handleChangeRating(e) {
    const filterData = { ...this.state.filterData, [e.target.name]: e.target.value }
    this.setState({ filterData})
  }

  handleChangeOrder(e) {
    const filterData = { ...this.state.filterData, sortTerm: e.target.value }
    this.setState({ filterData})
  }

  filterBurgers() {

    const re = new RegExp(this.state.filterData.searchTerm, 'i')
    const reIng = new RegExp(this.state.filterData.searchTermIng, 'i')
    const [field, order] = this.state.filterData.sortTerm.split('|')
    const filterBurgers = _.filter(this.state.burgers, burger => {
      return (this.state.filterData.ingredients.length ? _.intersection(burger.ingredients, this.state.filterData.ingredients).length : true) &&
        (re.test(burger.name) || re.test(burger.restaurant[0].name)) && (reIng.test(burger.ingredients))  &&
        ((this.state.filterData.isVegan && burger.isVegan) ||
        (this.state.filterData.isVegetarian && burger.isVegetarian) ||
        (!this.state.filterData.isVegan && !this.state.filterData.isVegetarian))
    })

    const sortedBurgers = _.orderBy(filterBurgers, [field], [order])
    return sortedBurgers
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <form>

                {/* SEARCH */}
                <div className="field">
                  <div className="control">
                    <input
                      placeholder="Search"
                      className="input  is-fullwidth is-primary"
                      onKeyUp={this.handleKeyUp}/>
                  </div>
                </div>

                {/* ORDER BY */}
                <div className="field">
                  <label className="label">Order by:</label>
                  <div className="select is-fullwidth is-primary">
                    <select onChange={this.handleChangeOrder}>
                      <option value="price|asc">Price Low first</option>
                      <option value="price|desc">Price High first</option>
                      <option value="rating|asc">Lower Rating first</option>
                      <option value="rating|desc">Higher Rating first</option>
                    </select>
                  </div>
                </div>

                {/* INGREDIENTS */}
                <div className="field">
                  <label className="label">Ingredients</label>
                  <div className="control">
                    <Select
                      isMulti
                      isSearchable
                      name="ingredients"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      onChange={this.handleChangeIngredients}
                      options={ingredients}
                    />
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        placeholder="Search for weird and wonderful ingredients"
                        className="input  is-fullwidth is-primary"
                        onKeyUp={this.handleKeyUpIngredients}/>
                    </div>
                  </div>
                </div>

                {/* VEGETARIAN */}
                <div className="field">
                  <label className="label">Vegetarian?</label>
                  <input
                    className="checkboxis-primary"
                    type="checkbox"
                    name="isVegetarian"
                    checked={this.state.filterData.isVegetarian || false}
                    onChange={this.handleCheckbox}
                  />
                </div>
                {/* VEGAN */}
                <div className="field">
                  <label className="label">Vegan?</label>
                  <input
                    className="checkbox is-primary"
                    type="checkbox"
                    name="isVegan"
                    checked={this.state.filterData.isVegan || false}
                    onChange={this.handleCheckbox}
                  />
                </div>
              </form>
            </div>


            <div className="column">
              <div className="columns is-multiline">
                {this.filterBurgers().map(burger =>
                  <div
                    key={burger._id}
                    className="column is-half-tablet is-one-third-desktop"
                  >
                    <Link to={`/burgers/${burger._id}`}>
                      <Card
                        name={burger.name}
                        image={burger.image}
                        rating={burger.rating}
                        restaurant={burger.restaurant[0].name}/>
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
