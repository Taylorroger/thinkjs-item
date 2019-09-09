var ObjectId = require('mongodb').ObjectId;
module.exports = class extends think.Mongo {
  getList({phone = '', currentPage = 1, pageSize = 20}) {
    return this
      .mongo('user')
      .where({
        phone: {
          $regex: new RegExp('' + phone + '')
        }
      })
      .order({createTime: -1})
      .page(currentPage, pageSize)
      .countSelect();
  }

  createOne(data = {}) {
    return this
      .mongo('user')
      .add(data);
  }

  getOne(_id) {
    return this
      .mongo('user')
      .where({
        _id: ObjectId(_id)
      })
      .find();
  }

  updateOne(_id, data) {
    return this
      .mongo('user')
      .where({
        _id: ObjectId(_id)
      }).update(data);
  }

  login(data) {
    return this
      .mongo('user')
      .where(data).find();
  }
};
