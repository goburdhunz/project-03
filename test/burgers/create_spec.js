/* global api, describe, it, expect, afterEach, beforeEach */

const Burger = require('../../models/Burger')
const User = require('../../models/User')
const testData = {
  name: 'The Test Cheeseburger',
  rating: 5,
  image: 'http://luckychip.co.uk/wp-content/uploads/2018/10/21-1024x678.jpg',
  ingredients: ['Beef Patty' , 'American Cheese', 'Ketchup', 'Mustard' ],
  price: 10.5,
  description: 'Burger Bear makes some of the best burgers in London. Burger Bear features preparation and flavors thought up by a burger genius. High quality beef, melted cheese, The Cheeseburger at the Lucky Chip is what a cheeseburger was meant to be. Perfectly charred beef that is hot off a griddle with gooey cheese melted on top. Add in some shredded lettuce, crinkle cut pickles, and a bun that gives a perfect texture to each bite. It\'s hard to think such a basic combination would be one of the best burgers I\'ve ever had, but this one redefines a cheeseburger. Top quality ingredients and perfect timing by the cooks make each one of these a mastery of burger science. A word of caution that Sebright Arms or the other Lucky Chip locations can be a bit difficult to find, however they are well worth the effort.',
  restaurant: {
    name: 'Test',
    address: 'Test',
    latitude: 51.5969403,
    longitude: -0.0702837,
    website: 'http://luckychip.co.uk'
  }
}


describe('POST /burgers', () => {

  afterEach(done => {
    Burger.remove({})
      .then(() => done())
  })

  xit('should return a 401', done => {
    api.post('/api/burgers')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201', done => {
    api.post('/api/burgers')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/burgers')
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.post('/api/burgers')
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
    api.post('/api/burgers')
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.restaurant).to.deep.eq(testData.restaurant)
        expect(res.body.rating).to.deep.eq(testData.rating)
        expect(res.body.image).to.eq(testData.image)
        expect(res.body.price).to.eq(testData.price)
        expect(res.body.description).to.eq(testData.description)
        expect(res.body.isVegan).to.eq(testData.isVegan)
        expect(res.body.isVegetarian).to.eq(testData.isVegetarian)
        expect(res.body.comments).to.eq(testData.comments)
        expect(res.body.ingredients).to.eq(testData.ingredients)
        done()
      })
  })

})
