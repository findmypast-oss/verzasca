const express = require('express')
const sut = require('../src/app')
const app = express();

app.get('/httpAuth/app/rest/builds/?locator=buildType:pass_build_1', function(req, res) {
  res.status(200)
    .json({
      "count": 100,
      "href": "/httpAuth/app/rest/builds/?locator=buildType:pass_build_1",
      "nextHref": "/httpAuth/app/rest/builds/?locator=buildType:pass_build_1,count:100,start:100",
      "build": [
        {
          "id": 336326,
          "buildTypeId": "pass_build_1",
          "number": "v651",
          "status": "SUCCESS",
          "state": "finished",
          "branchName": "master",
          "defaultBranch": true,
          "href": "/httpAuth/app/rest/builds/id:336326",
          "webUrl": "http://localhost:5000/viewLog.html?buildId=336326&buildTypeId=pass_build_1"
        }
    ]})
})

app.get('/httpAuth/app/rest/builds/?locator=buildType:fail_build_1', function(req, res) {
  res.status(200)
    .json({
      "count": 100,
      "href": "/httpAuth/app/rest/builds/?locator=buildType:fail_build_1",
      "nextHref": "/httpAuth/app/rest/builds/?locator=buildType:fail_build_1,count:100,start:100",
      "build": [
        {
          "id": 336326,
          "buildTypeId": "fail_build_1",
          "number": "v651",
          "status": "FAILURE",
          "state": "finished",
          "branchName": "master",
          "defaultBranch": true,
          "href": "/httpAuth/app/rest/builds/id:336326",
          "webUrl": "http://localhost:5000/viewLog.html?buildId=336326&buildTypeId=fail_build_1"
        }
    ]})
})

app.get('/httpAuth/app/rest/builds/?locator=buildType:pass_build_2', function(req, res) {
  res.status(200)
    .json({
      "count": 100,
      "href": "/httpAuth/app/rest/builds/?locator=buildType:pass_build_2",
      "nextHref": "/httpAuth/app/rest/builds/?locator=buildType:pass_build_2,count:100,start:100",
      "build": [
        {
          "id": 336326,
          "buildTypeId": "pass_build_2",
          "number": "v651",
          "status": "SUCCESS",
          "state": "finished",
          "branchName": "master",
          "defaultBranch": true,
          "href": "/httpAuth/app/rest/builds/id:336326",
          "webUrl": "http://localhost:5000/viewLog.html?buildId=336326&buildTypeId=pass_build_2"
        }
    ]})
})

describe('Given the verzasca tool', () => {
  var server = null

  beforeEach((done) => server = app.listen(5000, done))
  afterEach((done) => server.close(done))

  it('Should pass if one passing build', (done) => {
    sut({
      builds: ['pass_build_1'],
      url: 'http://localhost:5000',
      testMode: true
    }, (err) => {
      expect(err).to.be.an('undefined')
      done()
    })
  })

  it('Should pass if two passing builds', (done) => {
    sut({
      builds: ['pass_build_1', 'pass_build_2'],
      url: 'http://localhost:5000',
      testMode: true
    }, (err) => {
      expect(err).to.be.an('undefined')
      done()
    })
  })

  it('Should fail if one failing build', (done) => {
    sut({
      builds: ['fail_build_1'],
      url: 'http://localhost:5000',
      testMode: true
    }, (err) => {
      expect(err).to.be.an('undefined')
      done()
    })
  })

  it('Should fail if one passing and one failing build', (done) => {
    sut({
      builds: ['pass_build_1', 'fail_build_1'],
      url: 'http://localhost:5000',
      testMode: true
    }, (err) => {
      expect(err).to.be.an('undefined')
      done()
    })
  })
})
