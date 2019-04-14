# websocket-shell-service
Create an SSH-like service which lets clients open shells through websockets

```
npm install -g websocket-shell-service

# Start the service on the default port (8080)
websocket-shell-service

# Install the service (Windows / Linux) with a custom port
websocket-shell-service install --port 42069

# Remove the service from your machine
websocket-shell-service uninstall
```

## How it works:

- Sets up a websocket server bound to [localhost:8080](http://localhost:8080)
- Pipes incoming websocket connections to shells using [node-pty](https://github.com/Microsoft/node-pty)

If you'd like to have your service accessible to the internet, put it behind [Nginx with Basic Auth](https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/). You'll also want to make sure to [proxy websocket connections](https://www.nginx.com/blog/websocket-nginx/).

Check out `example.html` on how to render a Terminal in your browser using a websocket and [xtermjs](https://xtermjs.org/).
