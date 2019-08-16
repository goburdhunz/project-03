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









})
