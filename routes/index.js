/// imports ///
const { Route } = require ('./Route')

/***************************************
  routes
***************************************/

/// define ///
const server = new Route ()
const api = new Route (
  server,
  () => ('/api'),
)
const api_users = new Route (
  api,
  () => ('/users'),
)
const api_users_all = new Route (
  api_users,
)
const api_users_one = new Route (
  api_users,
  (id = ':id') => (`/${id}`),
)

/**************************************/

/// exports ///
module.exports = {
  routes : {
    _base : server.path (),
    api : {
      _base : api.path (),
      users : {
        _base : api_users.path (),
        all : api_users_all.path,
        one : api_users_one.path,
      }
    }
  }
}
