/// imports ///
const _ = require ('lodash/fp')
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

async function find (id = undefined) {
  const re = (_.isNil (id)) ? await db ('users') : findById (id)
  return re
}

async function findById (id) {
  const re = (
    await db ('users')
      .where ({ id: Number (id) })
      .first ()
  )
  return re
}

async function insert (user) {
  const [ id ] = (
    await db ('users')
      .insert (user)
  )
  return findById (id)
}

async function update (id, user) {
  const re = (
    await db ('users')
      .where ('id', Number (id))
      .update (user)
  )
  return re
}

async function remove (id) {
  return (
    db ('users')
      .where ('id', Number (id))
      .delete ()
  )
}
