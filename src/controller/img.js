const Base = require('./base.js');
const path = require('path');
const fs = require('fs');

module.exports = class extends Base {
  async getListAction() {
    const currentPage = this.get('currentPage');
    const pageSize = this.get('pageSize');
    const name = this.get('name');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('img').getList({name, currentPage, pageSize});
      json.data = res.data;
      json.totalSize = res.count;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async uploadOneAction() {
    const file = this.file('file');
    const json = {code: 0, data: null};
    try {
      const uploadPath = think.ROOT_PATH + '/www/public/upload';
      const filePath = file.path;
      const baseName = path.basename(filePath);
      const datas = fs.readFileSync(filePath);
      think.mkdir(uploadPath);
      fs.writeFileSync(uploadPath + '/' + baseName, datas);
      json.data = {
        url: '/public/upload/' + baseName
      };
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async createOneAction() {
    const name = this.post('name');
    const url = this.post('url');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('img').createOne({name, url, createTime});
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
      const res = await this.model('img').getOne(_id);
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
      const res = await this.model('img').updateOne(_id, {name, url});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }
};
