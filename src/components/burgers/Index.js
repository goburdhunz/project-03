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
  { value: 'Beef', label: 'Beef' },
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
      filterData: {
        searchTerm: '',
        sortTerm: 'price|asc',
        isVegan: false,
        isVegetarian: false,
        ingredients: []
      },
      burgers: []
    },
    this.filterBurgers = this.filterBurgers.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
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
    const [field, order] = this.state.filterData.sortTerm.split('|')
    const filterBurgers = _.filter(this.state.burgers, burger => {
      return (re.test(burger.name) || re.test(burger.restaurant[0].name)) &&
        burger.isVegan === this.state.filterData.isVegan &&
        burger.isVegetarian === this.state.filterData.isVegetarian
        //&& burger.ingredients.includes(this.state.filterData.ingredients[0] && this.state.filterData.ingredients[1])
    })
    const sortedBurgers = _.orderBy(filterBurgers, [field], [order])
    return sortedBurgers
  }
  render() {
    console.log('filterBurgers:', this.filterBurgers())
    console.log('filterData:', this.state.filterData)

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
                    checked={this.state.filterData.isVegetarian}
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
                    checked={this.state.filterData.isVegan}
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
