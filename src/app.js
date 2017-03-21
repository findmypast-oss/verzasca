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
${chalk.red('There are broken builds, do you want to continue?')}
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

function app(options) {
  const iterator = getBuildStatus.bind(null, options)

  async.map(options.builds, iterator, (err, results) => {
    if (err) {
      process.stdout(err)
      process.exit(1)
    }

    const buildStatuses = results.map(x => x.body.build[0])

    if (allBuildsPassed(buildStatuses)) {
      process.exit(0)
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'checkBuild',
          message: formatBuildStatuses(buildStatuses),
          choices: [
            'No',
            'Yes'
          ]
        }
      ])
      .then(answers => {
        if (answers.checkBuild === 'No') {
          process.exit(1)
        }
        process.exit(0)
      })
  })
}

module.exports = app
