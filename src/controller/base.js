module.exports = class extends think.Controller {
  async __before() {
    if (this.ctx.path === '/user/login') {

    } else {
      const token = this.ctx.headers['jwt-token'];
      const userInfo = await this.session(`token_${token}`);
      console.log(userInfo);
      if (think.isEmpty(userInfo)) {
        this.body = {code: 2, message: '未登录'};
        return false;
      }
    }
  }
};
