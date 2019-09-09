var ObjectId = require('mongodb').ObjectId;
module.exports = class extends think.Mongo {
  getList({name = '', currentPage = 1, pageSize = 20}) {
    return this
      .mongo('log')
      .where({
        name: {
          $regex: new RegExp('' + name + '')
        }
      })
      .order({createTime: -1})
      .page(currentPage, pageSize)
      .countSelect();
  }

  createOne(data = {}) {
    return this
      .mongo('log')
      .add(data);
  }

  getOne(_id) {
    return this
      .mongo('log')
      .where({
        _id: ObjectId(_id)
      })
      .find();
  }

  updateOne(_id, data) {
    return this
      .mongo('log')
      .where({
        _id: ObjectId(_id)
      }).update(data);
  }
};
