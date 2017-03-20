const chalk = require('chalk')

const format = ( buildStatuses ) => {

  const table = buildStatuses.reduce((acc, {buildTypeId, webUrl, status}) => {
  const colour = status === "SUCCESS" ? chalk.green : chalk.red

  return colour(`${acc}

Build Name: ${buildTypeId}
Status:     ${status}
Url:        ${webUrl}
    `)
  }, '')

  return `
================== TEAMCITY STATUS ==================
${table}

=====================================================
${chalk.red('There are broken builds, do you want to continue?')}
=====================================================
`
}

module.exports = format
