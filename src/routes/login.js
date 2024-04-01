const dbHelper = require('../common/dbHelper.js');

module.exports = function (app) {
  app.get('/login', function (req, res) {
    res.render('login.html');
  });

  app.post('/login', async function (req, res) {
    const User = dbHelper.getModel('user');
    const uname = req.body.username;
    const user = await User.findOne({ name: uname })
    if (user) {
      if (user.password === req.body.password) {
        req.session.user = user;
        res.send(200);
      } else {
        req.session.error = '密码错误！';
        res.send(404);
      }
    } else {
      req.session.error = '用户名不存在！';
      res.send(404);
    }
  });
}