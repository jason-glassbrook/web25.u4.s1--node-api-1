/// tools ///
const _ = require ('lodash/fp')

class Route {
  constructor (base, path = () => ('')) {

    /// find base ///
    // - if `base` is a Route or plain object, `base`'s `path`
    if (base instanceof Route || _.isPlainObject (base)) {
      this.base = base.path ()
    }
    // - if `base` is a string, use that
    else if (_.isString (base)) {
      this.base = base
    }
    // - else, use an empty string
    else {
      this.base = ''
    }

    /// create path ///
    this.path = (...args) => (
      `${this.base}${path (...args)}`
    )
  }
}

/// exports ///
module.exports = {
  Route,
}
