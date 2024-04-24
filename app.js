const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { apiClass } = require("./routes/posts");
const { userClass } = require("./routes/users");
const { resFaildWrite } = require("./module/resModule");
const app = express();
app.use(express.json());

// 引用環境變數檔
dotenv.config({ path: "./config.env" });
// const dbUrl = process.env.URL.replace("<password>", process.env.PASSWORD);
// .connect(dbUrl)

mongoose
  .connect('mongodb://127.0.0.1:27017/nodejs_homework4')
  .then(() => console.log("資料庫連線成功"))
  .catch(() => console.error("資料庫連線失敗")); 

const createClass = new apiClass(app);
const userControlClass = new userClass(app);
userControlClass.getUser();
createClass.getPost();
createClass.postPost();
createClass.delPost();
createClass.delAllPost();
createClass.patchPost();
createClass.notFound();
createClass.reqOptions();

// 自訂錯誤處理中間件
app.use((err, req, res, next) => {
  resFaildWrite(res, 400, "資料格式有誤");
});

app.listen(process.env.PORT, () => {
  console.log("PORT開始監聽");
});
