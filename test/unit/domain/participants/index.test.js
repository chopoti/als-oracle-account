'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
const Logger = require('@mojaloop/central-services-shared').Logger
const ParticipantService = require('../../../../src/domain/participants')
const ParticipantsModel = require('../../../../src/models/participants/index')

Test('ParticipantService', async (ParticipantServiceTest) => {
  let sandbox

  ParticipantServiceTest.beforeEach(test => {
    sandbox = Sinon.createSandbox()
    test.end()
  })

  ParticipantServiceTest.afterEach(test => {
    sandbox.restore()
    test.end()
  })

  await ParticipantServiceTest.test('getByParticipantId should', async getByParticipantIdTest => {
    try {
        const options = {
            logger: Logger
          }
 
          const bankCode = 111

      const participantResultStub = {
        "partyList": [
          {
            "fspId": "001",
            "currency": "TZS",
            "partySubIdOrType": ""
          }
        ]
      }
   
   
      ParticipantsModel.getByParticipantId = sandbox.stub().returns(participantResultStub)
    

      await getByParticipantIdTest.test('return participant accounts', async test => {
        try {
          let result = await ParticipantService.getByParticipantId( bankCode , options)
          test.ok(result, 'Result returned')
          test.ok(ParticipantsModel.getByParticipantId.withArgs( bankCode ).calledOnce, 'ParticipantsModel.getByParticipantId with args ... called once')
          test.end()
        } catch (err) {
          Logger.error(`getByParticipantIdTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await getByParticipantIdTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      getByParticipantIdTest.fail()
      getByParticipantIdTest.end()
    }
  })


  await ParticipantServiceTest.test('createParticipant should', async createParticipantTest => {
    try {
        const options = {
            logger: Logger
          }
 
          const fspId = '003'
          const currency = 'TZS'

      const participantResultStub = {
        "partyList": [
          {
            "fspId": "001",
            "currency": "TZS",
            "partySubIdOrType": ""
          }
        ]
      }
   
   
      ParticipantsModel.getByParticipantId = sandbox.stub().returns(participantResultStub)
    //   ParticipantsModel.createParticipant = sandbox.stub().returns('created')
    

      await createParticipantTest.test('return participant accounts', async test => {
        try {
          let result = await ParticipantService.getByParticipantId( fspId , options)
          test.ok(result,'Result returned')
          test.ok(ParticipantsModel.getByParticipantId.withArgs( fspId ).calledOnce, 'ParticipantsModel.getByParticipantId with args ... called once')
          //test.ok(ParticipantsModel.createParticipant.withArgs( fspId, currency).calledOnce, 'ParticipantsModel.createParticipant with args ... called once')
          test.end()
        } catch (err) {
          Logger.error(`getByParticipantIdTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await createParticipantTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      createParticipantTest.fail()
      createParticipantTest.end()
    }
  })

  await ParticipantServiceTest.test('updateByParticipantId should', async updateByParticipantIdTest => {
    try {
        const options = {
            logger: Logger
          }
 
          const fspId = '111'
          const currency = 'TZS'

      const participantResultStub = 'Ok'
   
   
      ParticipantsModel.updateByParticipantId = sandbox.stub().returns(participantResultStub)
    

      await updateByParticipantIdTest.test('update participant accounts', async test => {
        try {
          let result = await ParticipantService.updateByParticipantId( fspId, currency , options)
          test.ok(result, 'Result returned')
          test.ok(ParticipantsModel.updateByParticipantId.withArgs( fspId, currency ).calledOnce, 'ParticipantsModel.getByParticipantId with args ... called once')
          test.end()
        } catch (err) {
          Logger.error(`getByParticipantIdTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await updateByParticipantIdTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      updateByParticipantIdTest.fail()
      updateByParticipantIdTest.end()
    }
  })


  await ParticipantServiceTest.test('deleteByParticipantId should', async deleteByParticipantIdTest => {
    try {
        const options = {
            logger: Logger
          }
          const fspId = '111'

     ParticipantsModel.deleteParticipant = sandbox.stub().returns('ok')
    

      await deleteByParticipantIdTest.test('delete participant accounts', async test => {
        try {
          let result = await ParticipantService.deleteByParticipantId( fspId , options)
          test.ok(result, 'Result returned')
          test.ok(ParticipantsModel.deleteParticipant.withArgs( fspId ).calledOnce, 'ParticipantsModel.getByParticipantId with args ... called once')
          test.end()
        } catch (err) {
          Logger.error(`getByParticipantIdTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await deleteByParticipantIdTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      deleteByParticipantIdTest.fail()
      deleteByParticipantIdTest.end()
    }
  })


  await ParticipantServiceTest.test('getConfiguration should', async getConfigurationTest => {
    try {
        const options = {
            logger: Logger
          }

          const participantResultStub = {
            "partyList": [
              {
                "fspId": "001",
                "currency": "TZS",
                "partySubIdOrType": ""
              }
            ]
          }
       
       
          ParticipantsModel.getConfiguration = sandbox.stub().returns(participantResultStub)

      
      await getConfigurationTest.test('get Configuration', async test => {
        try {
          
          let result = await ParticipantService.getConfiguration()
          test.deepEqual(result,participantResultStub, 'Result returned')
          test.end()
        } catch (err) {
          Logger.error(`getConfiguration failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      await getConfigurationTest.end()
    } catch (err) {
      Logger.error(`ParticipantServiceTest failed with error - ${err}`)
      getConfigurationTest.fail()
      getConfigurationTest.end()
    }
  })
  await ParticipantServiceTest.end()
})
