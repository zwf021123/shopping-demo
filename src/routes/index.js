module.exports = function (app) {
  require('./register.js')(app)
  require('./login.js')(app)
  require('./home.js')(app)
  require('./cart.js')(app)
}