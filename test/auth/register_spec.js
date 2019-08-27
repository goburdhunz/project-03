/* global api, describe, it, expect, afterEach */
const User = require('../../models/User')

const testData = {
  username: 'testname',
  email: 'testname@test.com',
  password: 'pass',
  passwordConfirmation: 'pass'
}

describe('POST /register', () => {

  afterEach(done => {
    User.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.post('/api/register')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/register')
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return a message', done => {
    api.post('/api/register')
      .send(testData)
      .end((err, res) => {
        expect(res.body.message).to.eq('Registration successful. Login now to create, edit and comment on burgers!')
        done()
      })
  })

})
