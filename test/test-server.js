const express = require('express')
const app = express();

const testData = {
  pass_build_1: {
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
  ]},
  pass_build_2: {
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
  ]},
  fail_build_1: {
    "count": 100,
    "href": "/httpAuth/app/rest/builds/?locator=buildType:fail_build_1",
    "nextHref": "/httpAuth/app/rest/builds/?locator=buildType:fail_build_1,count:100,start:100",
    "build": [
      {
        "id": 336326,
        "buildTypeId": "fail_build_1",
        "number": "v651",
        "status": "FAILED",
        "state": "finished",
        "branchName": "master",
        "defaultBranch": true,
        "href": "/httpAuth/app/rest/builds/id:336326",
        "webUrl": "http://localhost:5000/viewLog.html?buildId=336326&buildTypeId=fail_build_1"
      }
  ]},
  fail_build_2: {
    "count": 100,
    "href": "/httpAuth/app/rest/builds/?locator=buildType:fail_build_2",
    "nextHref": "/httpAuth/app/rest/builds/?locator=buildType:fail_build_2,count:100,start:100",
    "build": [
      {
        "id": 336326,
        "buildTypeId": "fail_build_2",
        "number": "v651",
        "status": "FAILED",
        "state": "finished",
        "branchName": "master",
        "defaultBranch": true,
        "href": "/httpAuth/app/rest/builds/id:336326",
        "webUrl": "http://localhost:5000/viewLog.html?buildId=336326&buildTypeId=fail_build_2"
      }
  ]}
}

app.get('/health', function(req, res) {
  res.send('hi')
})

app.get('/httpAuth/app/rest/builds', function(req, res) {
  const { locator } = req.query
  const dataKey = locator.split(':')[1]
  res.status(200).json(testData[dataKey])
})

var server = null

module.exports = {
  start: (done) => server = app.listen(5000, done),
  stop: (done) => server.close(done)
}
