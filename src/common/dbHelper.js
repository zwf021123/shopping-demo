const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  models = require('./models');

for (let m in models) {
  mongoose.model(m, new Schema(models[m]));
}

const _getModel = function (type) {
  return mongoose.model(type);
}

module.exports = {
  getModel: function (type) {
    return _getModel(type);
  }
};