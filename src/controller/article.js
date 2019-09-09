const Base = require('./base.js');

module.exports = class extends Base {
  async getListAction() {
    const currentPage = this.get('currentPage');
    const pageSize = this.get('pageSize');
    const title = this.get('title');
    const author = this.get('author');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('article').getList({title, author, currentPage, pageSize});
      for (let i = 0; i < res.data.length; i++) {
        const item = res.data[i]
        const tags = [];
        for (let j = 0; j < item.tagIds.length; j++) {
          const tagId = item.tagIds[j]
          const tagObj = await this.model('tag').getOne(tagId)
          tags.push(tagObj);
        }
        item.tags = tags;
        item.column = await this.model('column').getOne(item.columnId);
      }
      json.data = res.data;
      json.totalSize = res.count;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async createOneAction() {
    const title = this.post('title');
    const author = this.post('author');
    const columnId = this.post('columnId');
    const tagIds = this.post('tagIds');
    const content = this.post('content');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('article').createOne({title, author, columnId, tagIds, content, createTime});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async getOneAction() {
    const _id = this.get('_id');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('article').getOne(_id);
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async updateOneAction() {
    const _id = this.get('_id');
    const title = this.post('title');
    const author = this.post('author');
    const columnId = this.post('columnId');
    const tagIds = this.post('tagIds');
    const content = this.post('content');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('article').updateOne(_id, {title, author, columnId, tagIds, content});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }
};
