import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'pretty-checkbox'
import ReactFilestack from 'filestack-react'

const imageKEY = process.env.imageKEY

const imageUpload = {
  accept: 'image/*',
  options: {
    resize: {
      width: 100
    }
  },
  transformations: {
    crop: false,
    circle: false,
    rotate: false
  }
}



class New extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {
        ingredients: [],
        restaurant: {},
        isVegan: false,
        isVegetarian: false
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRestaurantChange = this.handleRestaurantChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.handleIngredientCheckbox = this.handleIngredientCheckbox.bind(this)
    this.handleUploadImages = this.handleUploadImages.bind(this)
    this.handleNegativePrices = this.handleNegativePrices.bind(this)
  }

  handleNegativePrices(price) {
    return Math.abs(price)
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

  handleUploadImages(e) {
    const formData = {...this.state.formData, image: e.filesUploaded[0].url}
    this.setState({ formData })
    document.getElementById('progress').innerHTML = 'image chosen'
  }


  handleChange(e) {
    console.log(e.target.name)
    console.log(e.target.value)
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
      .then(() => {
        this.props.history.push('/burgers')
        toast.success('Burger Nominated!')
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }




  render() {
    console.log(this.state.formData)
    return (
      <section className="section-new-page">
        <form onSubmit={this.handleSubmit}>

          <div className="new-page">
            <div className="field">
              <label className="label">Burger Image</label>
              <figure className="image is-half">
                <div className="Dropzone upload-box">

                  <div className="uploadbutton">
                    <ReactFilestack
                      mode="transform"
                      apikey={imageKEY}
                      buttonClass="button"
                      options={imageUpload}
                      onSuccess={(e) => this.handleUploadImages(e)}
                      preload={true}
                    />
                    <br/>
                    <div><span id="progress"></span></div>

                  </div>

                </div>
              </figure>
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>

            <div className="burger name-rating-price">
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

              <div className="rating-price">
                <div className="field rating-field">
                  <label className="label">Rating</label>
                  <input
                    className="input"
                    type="number"
                    name="rating"
                    placeholder="eg: 1 - 5"
                    value={this.state.formData.rating || ''}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.rating && <small className="help is-danger">{this.state.errors.rating}</small>}
                </div>

                <div className="field price-field">
                  <label className="label">Price</label>
                  <input
                    className="input"
                    type="number"
                    name="price"
                    placeholder="eg: £5.60"
                    value={this.handleNegativePrices(this.state.formData.price) || ''}
                    onChange={this.handleChange}
                  />
                  {this.state.errors.price && <small className="help is-danger">{this.state.errors.price}</small>}
                </div>

              </div>
              <div className ="vegan">
                <div className="field vegeterian-field">
                  <div className="optionveg">
                    <label className="label">Vegetarian</label>
                    <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                      <input
                        type="checkbox"
                        name="isVegetarian"
                        checked={this.state.formData.isVegetarian || false}
                        onChange={this.handleCheckbox}
                      />
                      <div className="state p-warning">
                        <label> </label>
                      </div>
                      {this.state.errors.isVegetarian && <small className="help is-danger">{this.state.errors.isVegetarian}</small>}
                    </div>
                  </div>
                </div>

                <div className="field vegan-field">
                  <div className="optionveg">
                    <label className="label">Vegan</label>
                    <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                      <input
                        type="checkbox"
                        name="isVegan"
                        checked={this.state.formData.isVegan || false}
                        onChange={this.handleCheckbox}
                      />
                      <div className="state p-warning">
                        <label> </label>
                      </div>
                    </div>
                  </div>
                  {this.state.errors.isVegan && <small className="help is-danger">{this.state.errors.isVegan}</small>}
                </div>
              </div>



            </div>
          </div>

          <hr/>

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
                  name="Jalapenos"
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
                  name="Mushroom"
                  onChange={this.handleIngredientCheckbox}
                />
                <div className="state p-warning">
                  <label>Mushroom</label>
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
                  name="Bun"
                  onChange={this.handleIngredientCheckbox}
                />
                <div className="state p-danger">
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
                <div className="state p-danger">
                  <label>Brioche</label>
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
                <div className="state p-success">
                  <label>BBQ Sauce</label>
                </div>
              </div>
            </div>

            <div className="option">
              <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                <input
                  type="checkbox"
                  name="Ketchup"
                  onChange={this.handleIngredientCheckbox}
                />
                <div className="state p-success">
                  <label>Ketchup</label>
                </div>
              </div>
            </div>

            <div className="option">
              <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                <input
                  type="checkbox"
                  name="Mustard"
                  onChange={this.handleIngredientCheckbox}
                />
                <div className="state p-success">
                  <label>Mustard</label>
                </div>
              </div>
            </div>

            <div className="option">
              <div className="pretty p-default p-curve p-smooth p-round p-bigger">
                <input
                  type="checkbox"
                  name="Mayonnaise"
                  onChange={this.handleIngredientCheckbox}
                />
                <div className="state p-success">
                  <label>Mayonnaise</label>
                </div>
              </div>
            </div>

            {this.state.errors.ingredients && <small className="help is-danger">{this.state.errors.ingredients}</small>}
          </div>

          <hr/>

          <div className="field">
            <label className="label">Description</label>
            <textarea
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
            {this.state.errors['restaurant.name'] && <small className="help is-danger">{this.state.errors['restaurant.name']}</small>}
          </div>

          <div className="field">
            <label className="label">Address</label>
            <input
              className="input"
              name="address"
              placeholder="eg: 56 Lettuce street"
              value={this.state.formData.restaurant.address || ''}
              onChange={this.handleRestaurantChange}
            />
            {this.state.errors['restaurant.address'] && <small className="help is-danger">{this.state.errors['restaurant.address']}</small>}
          </div>

          <div className="field">
            <label className="label">Postcode</label>
            <input
              className="input"
              name="postcode"
              placeholder="eg: WC1 4TT"
              value={this.state.formData.restaurant.postcode|| ''}
              onChange={this.handleRestaurantChange}
            />
            {this.state.errors['restaurant.postcode'] && <small className="help is-danger">{this.state.errors['restaurant.postcode']}</small>}
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
            {this.state.errors['restaurant.website'] && <small className="help is-danger">{this.state.errors['restaurant.website']}</small>}
          </div>

          <button className="button is-danger">Submit</button>
          <hr />
        </form>
      </section>
    )
  }



}

export default New
