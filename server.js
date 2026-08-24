// cPanel Node.js App Manager entry point — Passenger runs `node server.js`
// and expects it to listen on process.env.PORT. `next start` alone can't be
// used as the startup file, so this wraps Next's request handler manually.
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(port, () => {
    console.log(`Ready on port ${port}`);
  });
});
