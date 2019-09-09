var ObjectId = require('mongodb').ObjectId;
module.exports = class extends think.Mongo {
  getList({title = '', author = '', currentPage = 1, pageSize = 20}) {
    return this
      .mongo('article')
      .where({
        $and: [
          {
            title: {
              $regex: new RegExp('' + title + '')
            }
          }, {
            author: {
              $regex: new RegExp('' + author + '')
            }
          }
        ]
      })
      .order({createTime: -1})
      .page(currentPage, pageSize)
      .countSelect();
  }

  createOne(data = {}) {
    return this
      .mongo('article')
      .add(data);
  }

  getOne(_id) {
    return this
      .mongo('article')
      .where({
        _id: ObjectId(_id)
      })
      .find();
  }

  updateOne(_id, data) {
    return this
      .mongo('article')
      .where({
        _id: ObjectId(_id)
      }).update(data);
  }
};
