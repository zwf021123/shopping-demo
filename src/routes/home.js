const dbHelper = require('../common/dbHelper.js');

module.exports = function (app) {
  app.get('/home', async function (req, res) {
    if (!req.session.user) {
      req.session.error = "请先登录"
      res.redirect('/login');
      return
    }

    var commoditys = dbHelper.getModel('commoditys');

    const docs = await commoditys.find({})
    const data = {
      commoditys: docs
    }
    res.render('home.html', data);
  });

  app.get('/addToCart/:_id', async function (req, res) {
    if (!req.session.user) {
      req.session.error = "请先登录"
      res.redirect('/login');
      return
    }
    console.log('添加到购物车', req.params._id);
    const id = req.params._id;
    const Cart = dbHelper.getModel('cart');
    const commoditys = dbHelper.getModel('commoditys');
    // 是否当前用户已经添加过该商品
    const doc = await Cart.findOne({ "uId": req.session.user._id, "cId": id });
    console.log('是否已经添加过', doc);
    if (!doc) {
      // 未添加过
      const commodity = await commoditys.findOne({ "_id": id });
      const data = {
        uId: req.session.user._id,
        cId: id,
        cName: commodity.name,
        cPrice: commodity.price,
        cQuantity: 1,
        cStatus: false
      }
      await Cart.create(data);
    }
    else {
      // 添加过
      const tempNum = doc.cQuantity;
      await Cart.updateOne({ "uId": req.session.user._id, "cId": id }, { $set: { cQuantity: tempNum + 1 } })
    }
    console.log('添加成功');
    res.redirect('/home');

  });

}