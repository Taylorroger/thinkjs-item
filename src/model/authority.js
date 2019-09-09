var ObjectId = require('mongodb').ObjectId;
module.exports = class extends think.Mongo {
  getList({name = ''}) {
    return this
      .mongo('authority')
      .where({
        name: {
          $regex: new RegExp('' + name + '')
        }
      })
      .order({number: 1})
      .countSelect();
  }

  createOne(data = {}) {
    return this
      .mongo('authority')
      .add(data);
  }

  getOne(_id) {
    return this
      .mongo('authority')
      .where({
        _id: ObjectId(_id)
      })
      .find();
  }

  updateOne(_id, data) {
    return this
      .mongo('authority')
      .where({
        _id: ObjectId(_id)
      }).update(data);
  }
};
