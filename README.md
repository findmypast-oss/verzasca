# verzasca
CLI tool to check teamcity builds add friction if you've got broken builds

[![npm](https://img.shields.io/npm/v/verzasca.svg)](https://www.npmjs.com/package/verzasca)
[![Build](https://img.shields.io/travis/findmypast-oss/verzasca.svg)](https://travis-ci.org/findmypast-oss/verzasca)
[![Coveralls](https://img.shields.io/coveralls/findmypast-oss/verzasca.svg)](https://coveralls.io/github/findmypast-oss/verzasca)
[![License](https://img.shields.io/github/license/findmypast-oss/verzasca.svg)](https://github.com/findmypast-oss/verzasca/blob/master/LICENSE)

### Installing

Install globally `npm install -g verzasca`

### When would I use this?

Add this as a git [pre-hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) as part of your `git push` then you can avoid putting more commits on top of a broken build.

An example `pre-push` might look a little like this

```sh
#!/bin/bash
#allow interactive shell commands
exec < /dev/tty

# check for broken builds
verzasca --url http://teamcity --auth ABCDEFGHIG --builds Build1,Build2 || exit
```

### Usage + Example

```
Usage: index [options]

Options:

  -h, --help            output usage information
  -V, --version         output the version number
  --url <url>           Set teamcity url
  --builds <builds...>  The builds to check the status of (comma separated)
  --auth <auth>         Basic auth token for teamcity
```

This is an example command which will result in output like below

```
verzasca --url http://teamcity --auth ABCDEFGHIG --builds Build1,Build2
```

```
================== TEAMCITY STATUS ==================

Build Name: Build1
Status:     SUCCESS
Url:        http://teamcity/viewLog.html?buildId=123&buildTypeId=Build1

Build Name: Build2
Status:     FAILURE
Url:        http://teamcity/viewLog.html?buildId=124&buildTypeId=Build2

=====================================================
There are broken builds, do you want to continue?
=====================================================
 (Use arrow keys)
❯ Stop
  Continue
```

Selecting `Stop` will exit with code 1, selecting `Continue` will exit with code 0
