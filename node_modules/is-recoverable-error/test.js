var isRecoverableError = require('./')
var assert = require('chai').assert

describe('error is recoverable', function () {
  it('recovers when input is function x () {', function () {
    assert.equal(isRecoverableError('function x () {'), true)
  })

  it('recovers when input is [1, 2, 3].forEach((x) =>  {', function () {
    assert.equal(isRecoverableError('[1, 2, 3].forEach((x) =>  {'), true)
  })

  it('recovers when input is db.coll.find().forEach((x) => {', function () {
    assert.equal(isRecoverableError('db.coll.find().forEach((x) => {'), true)
  })

  it('recovers when input is db.coll.insertOne({', function () {
    assert.equal(isRecoverableError('db.coll.insertOne({'), true)
  })

  it('recovers for an unterminated template', function () {
    assert.equal(isRecoverableError('var x =`'), true)
  })

  it('recovers for a \r separator', function () {
    assert.equal(isRecoverableError('var x = \r'), true)
  })

  it('recovers for an unterminated comment', function () {
    assert.equal(isRecoverableError('var x = 6 /**'), true)
  })

  it('recovers for an unterminated string constant that uses u2028', function () {
    assert.equal(isRecoverableError('var x =\u2028'), true)
  })

  it('recovers for an unterminated string constant that uses u2029', function () {
    assert.equal(isRecoverableError('var x =\u2029'), true)
  })
})

describe('error is non-recoverable', function () {
  it('does not recover when input is <cat>', function () {
    assert.equal(isRecoverableError('<cat>'), false)
  })

  it('does not when input is db.coll.find(.forEach((x) => {', function () {
    assert.equal(isRecoverableError('db.coll.find(.forEach((x) => {'), false)
  })
  it('does not recover for a regular unterminated string constant', function () {
    assert.equal(isRecoverableError('var x = \'unfinished string'), false)
  })

  it('does not recover for a single line unterminated comment', function () {
    assert.equal(isRecoverableError('function x () //\n'), true)
  })
})
