const program = require('commander')
const version = require('./../package.json').version
const chalk = require('chalk')
const app = require('./app')

program
  .version(version)
  .option('--url <url>', 'Set teamcity url')
  .option('--builds <builds...>', 'The builds to check the status of (comma separated)', x => x.split(','))
  .option('--auth <auth>', 'Basic auth token for teamcity')
  .option('--test-mode', 'Run in test mode')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp(chalk.cyan)
  process.exit(0)
}

try {
  app(
    { url: program.url, builds: program.builds, auth: program.auth },
    () => process.exit(0)
  )
}
catch (err) {
  process.exit(1)
}
