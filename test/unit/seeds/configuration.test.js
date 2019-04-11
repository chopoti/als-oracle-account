'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const Logger = require('@mojaloop/central-services-shared').Logger
const Model = require('../../../seeds/configuration')

Test('Currency', async (configurationSeedTest) => {
  let sandbox

  configurationSeedTest.beforeEach(t => {
    sandbox = Sinon.createSandbox()
    t.end()
  })

  configurationSeedTest.afterEach(t => {
    sandbox.restore()
    t.end()
  })

  await configurationSeedTest.test('seed should', async (test) => {
    const knexStub = sandbox.stub()
    knexStub.returns({
      insert: sandbox.stub().returns(true)
    })

    try {
      const result = await Model.seed(knexStub)
      test.equal(result, true, 'call insert')
      test.ok(knexStub.withArgs('configuration').calledOnce, 'knex called with configuration once')
      test.end()
    } catch (err) {
      Logger.error(`configuration seed failed with error - ${err}`)
      test.fail()
      test.end()
    }
  })

  await configurationSeedTest.test('seed should', async (test) => {
    function DuplicateEntryError (message) {
      this.name = 'DuplicateEntryError'
      this.message = message || ''
      this.code = 'ER_DUP_ENTRY'
    }
    DuplicateEntryError.prototype = Error.prototype

    const knexStub = sandbox.stub()
    knexStub.throws(new DuplicateEntryError())
    try {
      const result = await Model.seed(knexStub)
      test.equal(result, -1001, 'Duplicate error intercepted and ignored')
      test.end()
    } catch (err) {
      Logger.error(`currency seed failed with error - ${err}`)
      test.fail()
      test.end()
    }
  })

  await configurationSeedTest.test('seed should', async (test) => {
    const knexStub = sandbox.stub()
    knexStub.returns({
      insert: sandbox.stub().throws(new Error())
    })
    try {
      const result = await Model.seed(knexStub)
      test.equal(result, -1000, 'Generic error intercepted and logged')
      test.end()
    } catch (err) {
      Logger.error(`configuration seed failed with error - ${err}`)
      test.fail()
      test.end()
    }
  })

  await configurationSeedTest.end()
})
