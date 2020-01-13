/// tools ///
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

/// routes ///
const { routes } = require ('./routes')
console.log (routes)

/***************************************
  define requests
***************************************/

/*******************
  .root
*******************/

/// get ///
server.get (routes.root, (ri, ro) => {
  console.log (`>>> ${routes.root} .get <<<`)
  ro
    .json ({
      message : 'hello world',
    })
})

/*******************
  .api.root
*******************/

/// get ///
server.get (routes.api.root, (ri, ro) => {
  console.log (`>>> ${routes.api.root} .get <<<`)
  ro
    .json ({
      message : 'hello world',
    })
})

/*******************
  .api.users.all
*******************/

/*******************
  .api.users.one
*******************/

/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
