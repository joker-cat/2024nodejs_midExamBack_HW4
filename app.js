const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { apiClass } = require("./routes/posts");
const { resFaildWrite } = require("./module/resModule");
const app = express();
app.use(express.json());

// 引用環境變數檔
dotenv.config({ path: "./config.env" });
const dbUrl = process.env.URL.replace("<password>", process.env.PASSWORD);

mongoose
  // .connect(dbUrl)
  .connect('mongodb://127.0.0.1:27017/nodejs_homework3')
  .then(() => console.log("資料庫連線成功"))
  .catch(() => console.error("資料庫連線失敗")); 

const createClass = new apiClass(app);
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
