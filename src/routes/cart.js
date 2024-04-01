const dbHelper = require('../common/dbHelper.js');

module.exports = function (app) {
  app.get('/cart', async function (req, res) {
    if (!req.session.user) {
      req.session.error = "请先登录"
      res.redirect('/login');
      return
    }
    const Cart = dbHelper.getModel('cart');
    const docs = await Cart.find({ uId: req.session.user._id, cStatus: false });
    console.log('购物车数据', docs);
    if (docs) {
      const data = {
        cart: docs
      }
      res.render('cart.html', data);
    }

  })

  app.post('/cart', async function (req, res) {
    const Cart = dbHelper.getModel('cart');
    const id = req.body.id;
    const cQuantity = req.body.quantity;
    await Cart.updateOne({ "uId": req.session.user._id, "_id": id }, [{ $set: { cQuantity: cQuantity, cStatus: true } }])
    res.redirect('/cart');
  })

  app.get("/delFromCart/:id", async function (req, res) {
    //req.params.id 获取ID号
    var Cart = dbHelper.getModel('cart');
    await Cart.deleteOne({ "_id": req.params.id })
    console.log('删除成功');
    res.redirect('/cart');
  });
}