import React from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Card from './Card'
import axios from 'axios'
import _ from 'lodash'
const animatedComponents = makeAnimated()

const ingredients = [
  { value: 'Bacon', label: 'Bacon' },
  { value: 'Tomato', label: 'Tomato' },
  { value: 'Lettuce', label: 'Lettuce' },
  { value: 'Cheese', label: 'Cheese' },
  { value: 'Pickles', label: 'Pickles' },
  { value: 'Ketchup', label: 'Ketchup' }
]

class BurgersIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      formData: {},
      burgers: [],
      searchTerm: '',
      sortTerm: 'price|asc'
    },
    this.filterBurgers = this.filterBurgers.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  componentDidMount() {
    axios.get('api')
      .then(res => this.setState({ burgers: res.data}))
  }

  handleChangeIngredients(selectedIngredients) {
    this.setState({ selectedIngredients })
    const ingredients = selectedIngredients.map(ingredients => ingredients.value)
    const formData = { ...this.state.formData, ingredients: ingredients}
    this.setState({ formData })
    console.log(formData)
  }

  handleKeyUp(e) {
    const formData = { ...this.state.formData, searchTerm: e.target.value }
    this.setState({ formData })
  }

  handleCheckbox(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.checked }
    this.setState({ formData })
  }

  handleChangeRating(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData})
  }

  handleChangeOrder(e) {
    const formData = { ...this.state.formData, sortTerm: e.target.value }
    this.setState({ formData})
  }

  filterBurgers() {
    const re = new RegExp(this.state.searchTerm, 'i')
    const [field, order] = this.state.sortTerm.split('|')
    const filterBurgers = _.filter(this.state.burgers, burger => {
      return re.test(burger.name) || re.test(burger.restaurant[0].name)
    })
    const sortedBurgers = _.orderBy(filterBurgers, [field], [order])
    return sortedBurgers
  }
  render() {
    console.log('filterBurgers:', this.filterBurgers())
    console.log('formData:', this.state.formData)

    const { selectedIngredients } = this.state
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
                      className="input"
                      onKeyUp={this.handleKeyUp}/>
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
                      className="basic-multi-select"
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      value={selectedIngredients}
                      onChange={this.handleChangeIngredients}
                      options={ingredients}
                    />
                  </div>
                </div>

                {/* VEGETARIAN */}
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
                {/* VEGAN */}
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
                {/* ORDER BY */}
                <div className="field">
                  <label className="label">Order by:</label>
                  <div className="select is-fullwidth">
                    <select onChange={this.handleChangeOrder}>
                      <option value="price|asc">Price Low first</option>
                      <option value="price|desc">Price High first</option>
                      <option value="rating|asc">Lower Rating first</option>
                      <option value="rating|desc">Higher Rating first</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>


            <div className="column">
              <div className="columns is-multiline">
                {this.filterBurgers().map(burger =>
                  <div
                    key={burger._id}
                    className="column is-half-tablet is-one-quarter-desktop"
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
