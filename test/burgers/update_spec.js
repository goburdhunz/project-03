/* global api, describe, it, expect, beforeEach, afterEach */
const Burger = require('../../models/Burger')
const User = require('../../models/User')
const burgerData = require('../../db/data/burgerData')
const userData = require('../../db/data/userData')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testData = {
  name: 'Burger',
  rating: 3,
  image: 'https://webaddress.com',
  ingredients: ['bun', 'beef'],
  price: 5,
  description: 'burger',
  isVegan: false,
  isVegetarian: false,
  restaurant: [{
    name: 'restaurant',
    address: 'next door',
    latitude: 1,
    longitude: 2,
    website: 'https://restaurant.com'
  }]
}

describe('PUT /burgers/:id', () => {
  let burger = null
  let token = null

  beforeEach(done => {
    Burger.create(burgerData)
      .then(burgers => {
        burger = burgers[0]
        return User.create(userData)
      })
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '8h' })
        done()
      })
  })

  afterEach(done => {
    Burger.remove({})
      .then(() => User.remove({}))
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.put(`/api/burgers/${burger._id}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api.put(`/api/burgers/${burger._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/burgers/${burger._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/burgers/${burger._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'restaurant',
          'rating',
          'image',
          'price',
          'description',
          'isVegan',
          'isVegetarian',
          'comments',
          'ingredients'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api.put(`/api/burgers/${burger._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        console.log(res.body)
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.restaurant._id).to.eq(testData.restaurant._id)
        expect(res.body.restaurant.name).to.eq(testData.restaurant.name)
        expect(res.body.restaurant.address).to.eq(testData.restaurant.address)
        expect(res.body.restaurant.latitude).to.eq(testData.restaurant.latitude)
        expect(res.body.restaurant.longitude).to.eq(testData.restaurant.longitude)
        expect(res.body.rating).to.eq(testData.rating)
        expect(res.body.image).to.eq(testData.image)
        expect(res.body.price).to.eq(testData.price)
        expect(res.body.description).to.eq(testData.description)
        expect(res.body.isVegan).to.eq(testData.isVegan)
        expect(res.body.isVegetarian).to.eq(testData.isVegetarian)
        expect(res.body.ingredients).to.deep.eq(testData.ingredients)
        done()
      })
  })

})
