const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./api/v1/router');
const server = express();

// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
server.use(compress());

// secure servers by setting various HTTP headers
server.use(helmet());

// logging
server.use(morgan('combined'));

// mount api v1 routes
server.use('/api/v1', routes);
server.use('/healthcheck', (req, res) => res.status(200).end());
server.use('/*', (req, res) => res.status(404).send('Not Found'));

module.exports = server;