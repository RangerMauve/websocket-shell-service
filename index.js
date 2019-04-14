const WebSocket = require('ws')
const os = require('os')
const pty = require('node-pty')

const DEFAULT_SHELL = os.platform() === 'win32' ? 'cmd.exe' : 'login'

module.exports =

class WebsocketShellServer {
  constructor ({ shell = DEFAULT_SHELL, server }) {
    if (!server) throw new TypeError('Missing http server parameter')
    const wss = new WebSocket.Server({
      server
    })

    wss.on('connection', (connection) => {
      const ptyProcess = pty.spawn(shell, [], {
        cwd: process.env.HOME,
        env: process.env
      })

      ptyProcess.on('data', (data) => {
        connection.send(data)
      })

      connection.on('message', (message) => {
        ptyProcess.write(message)
      })

      ptyProcess.once('close', () => {
        connection.removeAllListeners()
        connection.close()
      })

      connection.once('close', () => {
        ptyProcess.removeAllListeners()
        ptyProcess.destroy()
      })
    })

    this.wss = wss
  }
}
