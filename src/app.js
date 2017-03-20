const inquirer = require('inquirer')
const buildStatus = require('./build-status')
const formatBuildStatus = require('./format-build-status')
const async = require('async')

module.exports = (options) => {
  const iterator = buildStatus.bind(null, options)

  async.map(options.builds, iterator, function(err, results) {
    const buildSummary = results
      .map(x => x.body.build[0])
      .map(x => ({
        webUrl: x.webUrl,
        buildTypeId: x.buildTypeId,
        status: x.status
      }))

    if(buildSummary.every( ({status}) => status === 'SUCCESS' )) {
      process.exit(0)
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'checkBuild',
          message: formatBuildStatus(buildSummary),
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
