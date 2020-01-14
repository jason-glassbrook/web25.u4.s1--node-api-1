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
  const re = (_.isNil (id)) ? await db ('users') : await findById (id)
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
  return await findById (id)
}

async function update (id, user) {
  const status = (
    await db ('users')
      .where ('id', Number (id))
      .update (user)
  )
  const re = await findById (id)
  return [ status, re ]
}

async function remove (id) {
  const re = await findById (id)
  const status = (
    await db ('users')
      .where ('id', Number (id))
      .delete ()
  )
  return [ status, re ]
}
