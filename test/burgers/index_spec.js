/*global api, describe, it, expect,beforeEach, afterEach */ //shutting linter up, making these methods to use
const Burger = require('../../models/Burger')
const burgerData = require('../../db/data/burgerData')

describe('GET /burgers', () => {

  beforeEach(done => {
    Burger.create(burgerData)
      .then(() => done())
  })

  afterEach(done => {
    Burger.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/burgers')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/burgers ')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/burgers')
      .end((err, res) => {
        res.body.forEach(burger => {
          expect(burger).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/burgers')
      .end((err, res) => {
        res.body.forEach(burger => {
          expect(burger).contains.keys([
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
        })
        done()
      })
  })


  it('should all use the correct data types', done => {
    api.get('/api/burgers')
      .end((err,res) => {
        res.body.forEach(burger => {
          expect(burger._id).to.be.a('string')
          expect(burger.name).to.be.a('string')
          expect(burger.restaurant).to.be.an('array')
          expect(burger.rating).to.be.a('number')
          expect(burger.price).to.be.a('number')
          expect(burger.image).to.be.a('string')
          expect(burger.description).to.be.a('string')
          expect(burger.isVegan).to.be.an('boolean')
          expect(burger.isVegetarian).to.be.an('boolean')
          expect(burger.comments).to.be.an('array')
          expect(burger.ingredients).to.be.an('array')
        })
        done()
      })
  })



})
