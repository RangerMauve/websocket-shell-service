#!/usr/bin/env node
const service = require('os-service')
const yargs = require('yargs')

const argv = yargs
  .option('port')
  .argv

const port = process.env.PORT || argv.port || 8080

require('./run')({ port })

service.run(() => {
  service.stop()
})
