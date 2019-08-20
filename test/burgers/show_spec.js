/* global api, describe, it, expect, beforeEach, afterEach */
const Burger = require('../../models/Burger')
const burgerData = require('../../db/data/burgerData')

describe('GET /burgers/:id', () => {
  let burger = null

  beforeEach(done => {
    Burger.create(burgerData)
      .then(burgers => {
        burger = burgers[0]
        done()
      })
  })

  afterEach(done => {
    Burger.remove({})
      .then(() => done())
  })

  it('should return a 200 response with a token', done => {
    api.get(`/api/burgers/${burger._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/burgers/${burger._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/burgers/${burger._id}`)
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

  it('should return the correct data types', done => {
    api.get(`/api/burgers/${burger._id}`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.restaurant).to.be.an('array')
        expect(res.body.rating).to.be.a('number')
        expect(res.body.image).to.be.a('string')
        expect(res.body.price).to.be.a('number')
        expect(res.body.description).to.be.a('string')
        expect(res.body.isVegan).to.be.a('boolean')
        expect(res.body.isVegetarian).to.be.a('boolean')
        expect(res.body.comments).to.be.an('array')
        expect(res.body.ingredients).to.be.an('array')
        done()
      })
  })

})
