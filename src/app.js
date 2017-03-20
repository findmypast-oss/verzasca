const inquirer = require('inquirer')
const async = require('async')
const request = require('superagent')
const chalk = require('chalk')

module.exports = function app(options) {
  const iterator = getBuildStatus.bind(null, options)

  async.map(options.builds, iterator, function(err, results) {
    const buildStatuses = results.map(x => x.body.build[0])

    if(buildStatuses.every( ({status}) => status === 'SUCCESS' )) {
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
      .then(function (answers) {
        if(answers.checkBuild === 'No') {
          process.exit(1)
        }
        process.exit(0)
      });
  })
}

function formatStatus({buildTypeId, webUrl, status}) {
  const colour = status === "SUCCESS" ? chalk.green : chalk.red
  return colour(`
Build Name: ${buildTypeId}
Status:     ${status}
Url:        ${webUrl}
  `)
}

function formatBuildStatuses( buildStatuses ) {
  const table = buildStatuses.reduce((acc, build) => {
    return `${acc} ${formatStatus(build)}`
  }, '')

  return `
================== TEAMCITY STATUS ==================
${table}
=====================================================
${chalk.red('There are broken builds, do you want to continue?')}
=====================================================
`
}

function getBuildStatus({url, auth}, build, done) {
  request
    .get(`${url}/httpAuth/app/rest/builds/?locator=buildType:${build}`)
    .set('Authorization', `Basic ${auth}`)
    .accept('application/json')
    .end(done)
}
