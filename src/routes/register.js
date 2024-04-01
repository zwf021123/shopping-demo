const dbHelper = require('../common/dbHelper.js');

module.exports = function (app) {
  app.get('/register', function (req, res) {
    res.render('register.html');
  });

  app.post('/register', async function (req, res) {
    const User = dbHelper.getModel('user');
    const uname = req.body.username;
    console.log('uname', uname);
    const user = await User.findOne({ name: uname })
    console.log('findOne结果', user);
    if (user) {
      req.session.error = '用户名已存在！';
      res.send(500);
    } else {
      User.create({
        name: uname,
        password: req.body.password
      }).then(user => {
        req.session.error = '用户名创建成功！';
        res.send(200);
      }).catch(err => {
        res.send(500);
      });
    }

  });
}