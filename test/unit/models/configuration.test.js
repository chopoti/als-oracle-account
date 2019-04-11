'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const Logger = require('@mojaloop/central-services-shared').Logger
const ConfigurationModel = require('../../../src/models/configuration')
const Db = require('@mojaloop/central-services-database').Db

Test('SettlementModel', async (ConfigurationModelTest) => {
    let sandbox

    ConfigurationModelTest.beforeEach(test => {
        sandbox = Sinon.createSandbox()
        test.end()
    })

    ConfigurationModelTest.afterEach(test => {
        sandbox.restore()
        test.end()
    })

    await ConfigurationModelTest.test('getConfiguration should', async getConfigurationTest => {
        try {
            await getConfigurationTest.test('return configuration variables', async test => {
                try {

                    const config = {
                        key: 'TYPE_REGEX',
                        value: 'ACCOUNT_ID'
                    }
                    Db.getKnex = sandbox.stub()
                    const knexStub = sandbox.stub()
                    Db.getKnex.returns(knexStub)
                    const selectStub = sandbox.stub()
                    knexStub.returns({
                        select: selectStub.returns(config)
                    })
                    const result = await ConfigurationModel.getConfiguration()
                    test.deepEqual(result, config, 'results match')
                    test.ok(knexStub.withArgs('configuration').calledOnce)
                    test.end()
                } catch (err) {
                    Logger.error(`getParticipantTest failed with error - ${err}`)
                    test.fail()
                    test.end()
                }
            })

            await getConfigurationTest.test('throw error', async test => {
                try {

                    Db.getKnex = sandbox.stub()
                    const knexStub = sandbox.stub().throws(new Error('Database unavailable'))
                    Db.getKnex.returns(knexStub)
                    try {
                        await ConfigurationModel.getConfiguration()
                        test.fail('Error expected, but not thrown!')
                    } catch (err) {
                        test.ok('Error thrown')
                    }
                    test.end()
                } catch (err) {
                    test.pass('Error thrown')
                    test.end()
                }
            })

            await getConfigurationTest.end()
        } catch (err) {
            Logger.error(`getConfigurationTest failed with error - ${err}`)
            getConfigurationTest.fail()
            getConfigurationTest.end()
        }
    })

    await ConfigurationModelTest.end()
})
