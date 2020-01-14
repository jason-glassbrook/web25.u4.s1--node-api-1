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
  validate data
***************************************/

const shapeOf = {
  user : {
    'name' : _.isString,
    'bio' : _.isString,
  },
}

const orNil = _.flow ([
  _.concat (_.isNil),
  _.overSome
])

/// full data ///

const hasValid = (dataName, path) =>
  _.conforms (_.pick ([ path ]) (shapeOf[dataName]))

const testsOf = (dataName) =>
  _.map ((key) => hasValid (dataName, key)) (_.keys (shapeOf[dataName]))

const isValid = (dataName) =>
  _.overEvery (testsOf (dataName))

/// partial data ///

const hasValidPartial = (dataName, path) =>
  _.conforms (orNil (_.pick ([ path ])) (shapeOf[dataName]))

const testsOfPartial = (dataName) =>
_.map ((key) => hasValidPartial (dataName, key)) (_.keys (shapeOf[dataName]))

const isValidPartial = (dataName) =>
  _.overEvery (testsOfPartial (dataName))

/***************************************
  define requests
***************************************/

/*******************
  ._base
*******************/

/// get ///
server.get (routes._base, (ri, ro) => {
  console.log (`>>> ${routes._base} .GET <<<`)
  ro
    .status (200)
    .json ({
      message : 'hello world',
    })
})

/*******************
  .api._base
*******************/

/// get ///
server.get (routes.api._base, (ri, ro) => {
  console.log (`>>> ${routes.api._base} .GET <<<`)
  ro
    .status (200)
    .json ({
      message : 'hello world',
    })
})

/*******************
  .api.users.all
*******************/

/// get ///
server.get (routes.api.users.all (), (ri, ro) => {
  console.log (`>>> ${routes.api.users.all ()} .GET <<<`)
  db.users
    .find ()
    .then ((users) => {
      console.log (`>>> ${routes.api.users.all ()} .GET .find .then <<<`)
      // console.log (users)
      ro
        .status (200)
        .json (users)
    })
    .catch ((error) => {
      console.log (`>>> ${routes.api.users.all ()} .GET .find .catch <<<`)
      // console.log (error)
      ro
        .status (500)
        .json ({
          error : error,
        })
    })
})

/// post ///
server.post (routes.api.users.all (), (ri, ro) => {
  console.log (`>>> ${routes.api.users.all ()} .POST <<<`)

  const user = ri.body
  console.log (user)

  if (isValid ('user') (user)) {
    console.log (`>>> ${routes.api.users.all ()} .POST .insert <<<`)
    db.users
      .insert (user)
      .then ((users) => {
        console.log (`>>> ${routes.api.users.all ()} .POST .insert .then <<<`)
        // console.log (users)
        ro
          .status (201)
          .json (users)
      })
      .catch ((error) => {
        console.log (`>>> ${routes.api.users.all ()} .POST .insert .catch <<<`)
        // console.log (error)
        ro
          .status (500)
          .json ({
            error : error,
          })
      })
  }
  else {
    console.log (`>>> ${routes.api.users.all ()} .POST no-valid-user <<<`)
    ro
      .status (400)
      .json ({
        error : 'user must conform to { bio : string, name : string }'
      })
  }
})

/*******************
  .api.users.one
*******************/

/// get ///
server.get (routes.api.users.one (), (ri, ro) => {
  console.log (`>>> ${routes.api.users.one ()} .GET <<<`)

  const { id } = ri.params
  console.log (id)

  db.users
    .find (id)
    .then ((user) => {
      console.log (`>>> ${routes.api.users.one ()} .GET .find .then <<<`)
      // console.log (user)
      if (_.isNil (user)) {
        ro
          .status (404)
          .json ({
            error : `could not find user by id : ${id}`,
          })
      }
      else {
        ro
          .status (200)
          .json (user)
      }
    })
    .catch ((error) => {
      console.log (`>>> ${routes.api.users.one ()} .GET .find .catch <<<`)
      // console.log (error)
      ro
        .status (500)
        .json ({
          error : error,
        })
    })
})

/// put ///
server.put (routes.api.users.one (), (ri, ro) => {
  console.log (`>>> ${routes.api.users.one ()} .PUT <<<`)

  const { id } = ri.params
  console.log (id)
  const user = ri.body
  console.log (user)

  db.users
    .update (id, user)
    .then (([ status, user ]) => {
      console.log (`>>> ${routes.api.users.one ()} .PUT .update .then <<<`)
      // console.log (user)
      if (status === 0) {
        ro
          .status (404)
          .json ({
            error : `could not find user by id : ${id}`,
          })
      }
      else {
        ro
          .status (200)
          .json (user)
      }
    })
    .catch ((error) => {
      console.log (`>>> ${routes.api.users.one ()} .PUT .update .catch <<<`)
      // console.log (error)
      ro
        .status (500)
        .json ({
          error : error,
        })
    })
})

/// delete ///
server.delete (routes.api.users.one (), (ri, ro) => {
  console.log (`>>> ${routes.api.users.one ()} .DELETE <<<`)

  const { id } = ri.params
  console.log (id)

  db.users
    .remove (id)
    .then (([ status, user ]) => {
      console.log (`>>> ${routes.api.users.one ()} .DELETE .remove .then <<<`)
      // console.log (status)
      if (status === 0) {
        ro
          .status (404)
          .json ({
            error : `could not delete user by id : ${id}`,
          })
      }
      else {
        ro
          .status (200)
          .json ({
            message : `deleted user by id : ${id}`,
            user,
          })
      }
    })
    .catch ((error) => {
      console.log (`>>> ${routes.api.users.one ()} .DELETE .remove .catch <<<`)
      // console.log (error)
      ro
        .status (500)
        .json ({
          error : error,
        })
    })
})

/***************************************
  run server
***************************************/

server.listen (port, () => {
  console.log (`it's alive!`)
  console.log (`\n>>> listening on port ${port} <<<\n`)
})
