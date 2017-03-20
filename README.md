# verzasca
CLI tool to check teamcity builds add friction if you've got broken builds

### Installing

Install globally `npm install -g verzasca`

### When would I use this?

Add this as a git [pre-hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) as part of your `git push` then you can avoid putting more commits on top of a broken build.

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

This is an example command

```
verzasca --url http://teamcity --auth ABCDEFGHIG --builds Build1,Build2
```

Will result in this output

 - if you select no exit code 1 is sent
 - if you select yes then exit code 0

If no builds are failing your build will continue as normal

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
❯ No
  Yes
```
