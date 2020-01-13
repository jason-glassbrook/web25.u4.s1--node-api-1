/// imports ///
const _ = require ('lodash')
const knex = require ('knex')

/// exports ///
module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
}

/// setup ///
const knexConfig = require ('../knexfile.js')
const db = knex (knexConfig.development)

/***************************************
  handlers
***************************************/

function find (id = undefined) {
  if (_.isNil (id)) {
    return (
      db ('users')
    )
  }
  else {
    return (
      findById (id)
    )
  }
}

function findById (id) {
  return (
    db ('users')
      .where ({ id: Number (id) })
      .first ()
  )
}

function insert (user) {
  return (
    db ('users')
      .insert (user)
      .then (ids => ({ id: ids[0] }))
  )
}

function update (id, user) {
  return (
    db ('users')
      .where ('id', Number (id))
      .update (user)
  )
}

function remove (id) {
  return (
    db ('users')
      .where ('id', Number (id))
      .del ()
  )
}
