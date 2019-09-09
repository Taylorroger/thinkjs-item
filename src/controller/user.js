const Base = require('./base.js');
const jsonwebtoken = require('jsonwebtoken');

module.exports = class extends Base {
  async getListAction() {
    const currentPage = this.get('currentPage');
    const pageSize = this.get('pageSize');
    const phone = this.get('phone');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('user').getList({phone, currentPage, pageSize});
      for (let i = 0; i < res.data.length; i++) {
        const item = res.data[i];
        if (typeof item.roleId !== 'undefined') {
          const role = await this.model('role').getOne(item.roleId);
          item.role = role;
        }
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
    const phone = this.post('phone');
    const password = this.post('password');
    const roleId = this.post('roleId');
    const createTime = (new Date()).getTime();
    const json = {code: 0, data: null};
    try {
      const res = await this.model('user').createOne({phone, password, roleId, createTime});
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
      const res = await this.model('user').getOne(_id);
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async updateOneAction() {
    const _id = this.get('_id');
    const phone = this.post('phone');
    const password = this.post('password');
    const roleId = this.post('roleId');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('user').updateOne(_id, {phone, password, roleId});
      json.data = res;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async loginAction() {
    const phone = this.post('phone');
    const password = this.post('password');
    const json = {code: 0, data: null};
    try {
      const res = await this.model('user').login({phone, password});
      if (res._id) {
        const {secret, cookie, expire} = this.config('jwt');
        const token = jsonwebtoken.sign(res, secret, {expiresIn: expire});
        this.cookie(cookie, token);
        await this.session(`token_${token}`, token);
        json.data = token;
      } else {
        json.code = -1;
        json.data = '账号或密码错误';
      }
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }

  async logoutAction() {
    const token = this.post('token');
    await this.session(`token_${token.phone}`, null);
    const json = {code: 0, data: null};
    try {
      json.data = true;
    } catch (err) {
      json.code = -1;
      json.data = err;
    }
    this.body = json;
  }
};
