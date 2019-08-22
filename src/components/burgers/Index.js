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
  { value: 'Jalapeños', label: 'Jalapeños' },
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
        sortTerm: 'rating|desc',
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
    const { searchTerm, searchTermIng, ingredients, isVegan, isVegetarian, sortTerm } = this.state.filterData
    const re = new RegExp(searchTerm, 'i')
    const reIng = new RegExp(searchTermIng, 'i')
    const [field, order] = sortTerm.split('|')
    const filterBurgers = _.filter(this.state.burgers, burger => {
      return (ingredients.length ? _.intersection(burger.ingredients, ingredients).length >= ingredients.length : true) &&
        (re.test(burger.name) || re.test(burger.restaurant.name)) && (reIng.test(burger.ingredients))  &&
        ((isVegan && burger.isVegan) ||
        (isVegetarian && burger.isVegetarian) ||
        (!isVegan && !isVegetarian))
    })

    const sortedBurgers = _.orderBy(filterBurgers, [field], [order])
    return sortedBurgers
  }
  render() {
    console.log(this.state.filterData)
    console.log(this.filterBurgers())
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
                      className="input  is-fullwidth"
                      onKeyUp={this.handleKeyUp}/>
                  </div>
                </div>

                {/* ORDER BY */}
                <div className="field">
                  <label className="label">Order by:</label>
                  <div className="select is-fullwidth">
                    <select onChange={this.handleChangeOrder}>
                      <option value="rating|desc">Higher Rating first</option>
                      <option value="rating|asc">Lower Rating first</option>
                      <option value="price|asc">Price Low first</option>
                      <option value="price|desc">Price High first</option>
                    </select>
                  </div>
                </div>

                <br/>
                <hr/>

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
                  <br/>
                  <div className="field">
                    <div className="control">
                      <input
                        placeholder="Search for weird and wonderful ingredients"
                        className="input  is-fullwidth is-warning"
                        onKeyUp={this.handleKeyUpIngredients}/>
                    </div>
                  </div>
                </div>

                <br/>
                <hr/>

                <div className ="vegan">
                  <div className="field vegeterian-field-index">
                    <div>
                      <label className="label">Vegetarian</label>
                      <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                        <input
                          type="checkbox"
                          name="isVegetarian"
                          checked={this.state.filterData.isVegetarian || false}
                          onChange={this.handleCheckbox}
                        />
                        <div className="state p-warning">
                          <label> </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field vegan-field">
                    <div>
                      <label className="label">Vegan</label>
                      <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                        <input
                          type="checkbox"
                          name="isVegan"
                          checked={this.state.filterData.isVegan || false}
                          onChange={this.handleCheckbox}
                        />
                        <div className="state p-warning">
                          <label> </label>
                        </div>
                      </div>
                    </div>
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
                        price={burger.price}
                        restaurant={burger.restaurant.name}
                        isVegetarian={burger.isVegetarian}
                        isVegan={burger.isVegan}/>
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
