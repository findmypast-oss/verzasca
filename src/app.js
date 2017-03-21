const inquirer = require('inquirer')
const async = require('async')
const request = require('superagent')
const chalk = require('chalk')

function formatStatus({ buildTypeId, webUrl, status }) {

  const colour = status === 'SUCCESS'
    ? chalk.green
    : chalk.red

  return colour(`
Build Name: ${buildTypeId}
Status:     ${status}
Url:        ${webUrl}
  `)
}

function formatBuildStatuses(buildStatuses) {
  const table = buildStatuses.reduce((acc, build) =>
    `${acc} ${formatStatus(build)}`
  , '')

  return `
================== TEAMCITY STATUS ==================
${table}
=====================================================
`
}

function getBuildStatus({ url, auth }, build, done) {
  request
    .get(`${url}/httpAuth/app/rest/builds/?locator=buildType:${build}`)
    .set('Authorization', `Basic ${auth}`)
    .accept('application/json')
    .end(done)
}

function allBuildsPassed(buildStatuses) {
  return buildStatuses.every(({ status }) =>
    status === 'SUCCESS'
  )
}

function interactiveMode() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'checkBuild',
        message: chalk.red('There are broken builds, do you want to continue?'),
        choices: [
          'No',
          'Yes'
        ]
      }
    ])
    .then(answers => {
      if (answers.checkBuild === 'No') {
        throw new Error('Stop')
      }
    })
}

function app(options, done) {
  const iterator = getBuildStatus.bind(null, options)

  async.map(options.builds, iterator, (err, results) => {
    if (err) {
      console.error(err)
      return done(err)
    }

    const buildStatuses = results.map(x => x.body.build[0])

    console.log(formatBuildStatuses(buildStatuses))

    if (allBuildsPassed(buildStatuses)) {
      return done()
    }

    if (options.testMode) {
      return done()
    }

    interactiveMode()
    return done()
  })
}

module.exports = app
