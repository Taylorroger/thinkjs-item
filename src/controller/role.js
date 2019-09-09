const Base = require('./base.js');

module.exports = class extends Base {
  async getListAction() {
    const name = this.get('name');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('role').getList({name});
      json.data = res.data;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async createOneAction() {
    const name = this.post('name');
    const description = this.post('description');
    const authorityList = this.post('authorityList');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('role').createOne({name, description, authorityList, createTime});
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
      const res = await this.model('role').getOne(_id);
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
    const description = this.post('description');
    const authorityList = this.post('authorityList');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('role').updateOne(_id, {name, description, authorityList});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }
};
