var ObjectId = require('mongodb').ObjectId;
module.exports = class extends think.Mongo {
  getList({name = ''}) {
    return this
      .mongo('role')
      .where({
        name: {
          $regex: new RegExp('' + name + '')
        }
      })
      .order({createTime: -1})
      .countSelect();
  }

  createOne(data = {}) {
    return this
      .mongo('role')
      .add(data);
  }

  getOne(_id) {
    return this
      .mongo('role')
      .where({
        _id: ObjectId(_id)
      })
      .find();
  }

  updateOne(_id, data) {
    return this
      .mongo('role')
      .where({
        _id: ObjectId(_id)
      }).update(data);
  }
};
