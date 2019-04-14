const http = require('http')

const WebsocketShellServer = require('./')

module.exports = ({ port }) => {
  const server = http.createServer()

  const shellServer = new WebsocketShellServer({
    server
  })

  server.listen(port, 'localhost')

  console.log('Running service on port', port)

  return {
    shellServer,
    server
  }
}
