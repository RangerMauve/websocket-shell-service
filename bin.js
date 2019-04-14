#!/usr/bin/env node
const yargs = require('yargs')

const SERVICE_NAME = 'websocket-shell'

yargs
  .command('$0', 'Run the WebSocket Shell Service', addPort, run)
  .command('install', 'Start the WebSocket Shell Service', addPort, install)
  .command('uninstall', 'Start the WebSocket Shell Service', addPort, uninstall)
  .parse(process.argv.slice(2))

function run () {
  require('./service')
}

function install (args) {
  const { port } = args

  const service = require('os-service')
  const programPath = getServiceLocation()

  const programArgs = []

  if (port) {
    programArgs.push('--port', port)
  }

  service.add(SERVICE_NAME, { programPath, programArgs }, (e) => {
    if (e) throw e
  })
}

function uninstall () {
  const service = require('os-service')

  service.remove(SERVICE_NAME, (e) => {
    if (e) throw e
  })
}

function getServiceLocation () {
  const path = require('path')
  return path.join(__dirname, 'service.js')
}

function addPort (yargs) {
  return yargs
    .option('port', {
      describe: 'The port to run the WebSocket server on',
      default: 8080,
      type: 'number'
    })
}
