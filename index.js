const { createServer } = require("node:http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
const express = require("express");
const port = 8000;

const app = express();
app.use(express.static("public", { extensions: ['html', 'htm'] }));
app.get('/load/:id', (req, res) => { res.sendFile(__dirname + '/public/load.html') }) // Allows loading projects and apps through id

const server = createServer();
const bare = createBareServer("/bare/");
app.use("/uv/", express.static(uvPath));

app.use((req, res) => { res.status(404).end('error page not found.'); });

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
  else socket.end();
});

server.listen({ port: port, });