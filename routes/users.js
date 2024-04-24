const { resSuccessWrite, resFaildWrite } = require("../module/resModule");
const { User } = require("../model/UserModel");

class userClass {
  constructor(app) {
    this.app = app;
    this.User = User;
  }

  getUser() {
    this.app.get("/user", async (req, res) => {
      try {
        const data = await this.User.find();
        resSuccessWrite(res, 200, data);
      } catch (error) {
        resFaildWrite(res, 400, "請求出錯!!!");
      }
    });
  }
}

module.exports = { userClass };
