const Base = require('./base.js');

module.exports = class extends Base {
  async getListAction() {
    const name = this.get('name');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('column').getList({name});
      json.data = res.data;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async createOneAction() {
    const name = this.post('name');
    const remark = this.post('remark');
    const parentId = this.post('parentId');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('column').createOne({name, remark, parentId, createTime});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async createRootOneAction() {
    const name = this.post('name');
    const remark = this.post('remark');
    const parentId = '0';
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('column').createOne({name, remark, parentId, createTime});
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
      const res = await this.model('column').getOne(_id);
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
    const remark = this.post('remark');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('column').updateOne(_id, {name, remark});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }
};
