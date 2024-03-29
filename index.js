const { createServer } = require("node:http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
const express = require("express");

const bare = createBareServer("/bare/");
const app = express();

app.use(express.static("public"));
app.use("/api/", express.static("api"));

app.use("/uv/", express.static(uvPath));

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.get('/', (req, res) => { res.render(__dirname + '/src/views/index.html') } )
app.get('/projects', (req, res) => { res.render(__dirname + '/src/views/projects.html') } )
app.get('/apps', (req, res) => { res.render(__dirname + '/src/views/apps.html') } )
app.get('/settings', (req, res) => { res.render(__dirname + '/src/views/settings.html') } )
app.get('/load/:id', (req, res) => { res.render(__dirname + '/src/views/load.html', { id: req.params.id }) })
// I know i could use a folder or whatever but then i cant use ejs layouts :( unless there is a way

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
  else socket.end();
});

const port = 8000;

server.listen({ port: port, });
console.log(`Railin' Online at http://localhost:${port}/`);