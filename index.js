const { createServer } = require("node:http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
const express = require("express");
const { existsSync } = require("fs");
const port = 8000;

if (existsSync("./public/css/") && existsSync("./public/cdn/projects/")) {

  const app = express();

  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html');
  app.use(express.static("public"));

  app.get('/', (req, res) => { res.render(__dirname + '/src/views/index.html') } )
  app.get('/settings', (req, res) => { res.render(__dirname + '/src/views/settings.html') })
  app.get('/projects', (req, res) => { res.render(__dirname + '/src/views/projects.html') })
  app.get('/apps', (req, res) => { res.render(__dirname + '/src/views/apps.html') })
  app.get('/load/:id', (req, res) => { res.render(__dirname + '/src/views/load.html', { id: req.params.id }) })
  // I know i could use a folder or whatever but then i cant use ejs layouts :( unless there is a way

  const server = createServer();
  const bare = createBareServer("/bare/");
  app.use("/uv/", express.static(uvPath));

  server.on("request", (req, res) => {
    if (bare.shouldRoute(req)) bare.routeRequest(req, res);
    else app(req, res);
  });

  server.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
    else socket.end();
  });

  server.listen({ port: port, });
  console.log(`Railin' Online at http://localhost:${port}/`);

} else console.error("Make sure you've ran the scss builder (npm run build) and have the game files downloaded!")