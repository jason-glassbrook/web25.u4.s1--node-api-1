/// external modules ///
const _ = require ('lodash/fp')
const express = require ('express')

/// database ///
const db = {
  users : require ('./data/db.js'),
}

/// server ///
const port = 5555
const server = express ()
server.use (express.json ())

