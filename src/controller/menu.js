const Base = require('./base.js');

module.exports = class extends Base {
  async getListAction() {
    const name = this.get('name');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('menu').getList({name});
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
    const url = this.post('url');
    const icon = this.post('icon');
    const number = this.post('number');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('menu').createOne({name, remark, url, number, icon, parentId, createTime});
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
    const url = this.post('url');
    const number = this.post('number');
    const icon = this.post('icon');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('menu').createOne({name, remark, url, number, icon, parentId, createTime});
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
      const res = await this.model('menu').getOne(_id);
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
    const url = this.post('url');
    const number = this.post('number');
    const icon = this.post('icon');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('menu').updateOne(_id, {name, remark, number, url, icon});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }
};
