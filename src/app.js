const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shopping");
  console.log('数据库连接成功')
}
main()



// Set the view engine to ejs for .html
app.set('view engine', 'html')
app.engine('.html', require('ejs').__express)

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// Set the public directory
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  resave: true,
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user; //保存用户信息
  var err = req.session.error;  //保存结果响应信息
  res.locals.message = '';  // 保存html标签
  if (err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom: 20px;color:red;">' + err + '</div>';
  next();
});


require('./routes')(app)



app.listen(80)