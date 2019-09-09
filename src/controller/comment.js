const Base = require('./base.js');

module.exports = class extends Base {
  async getListAction() {
    const currentPage = this.get('currentPage');
    const pageSize = this.get('pageSize');
    const name = this.get('name');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('comment').getList({name, currentPage, pageSize});
      json.data = res.data;
      json.totalSize = res.count;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async createOneAction() {
    const name = this.post('name');
    const remark = this.post('remark');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('comment').createOne({name, remark, createTime});
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
      const res = await this.model('comment').getOne(_id);
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async updateOneAction() {
    const _id = this.get('_id');
    const name = this.post('name');
    const url = this.post('url');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('comment').updateOne(_id, {name, url});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }
};
