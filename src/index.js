// eslint-disable-next-line no-global-assign
Promise = require('bluebird');
const {
  port, env
} = require('./config');

const server = require('./server');

server.listen(port, () => {
  console.info(`Server started on port ${port} (${env})`);
});

const src = server;

module.exports = src;