const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const { apiClass } = require("./routes/posts");
const { userClass } = require("./routes/users");
const { resFaildWrite } = require("./module/resModule");
const app = express();
app.use(express.json());
app.use(cors());

// 引用環境變數檔
dotenv.config({ path: "./config.env" });
const dbUrl = process.env.URL.replace("<password>", process.env.PASSWORD);

// 本地測試
// .connect('mongodb://127.0.0.1:27017/nodejs_homework4')

mongoose
  .connect(dbUrl)
  .then(() => console.log("資料庫連線成功"))
  .catch(() => console.error("資料庫連線失敗")); 

const createClass = new apiClass(app);
const userControlClass = new userClass(app);
userControlClass.getUser();
createClass.getPost();
createClass.postPost();
createClass.notFound();
createClass.reqOptions();

// app.get("/", async (req, res) => {
//   res.send('2024nodejs_midExam_期中作業');
// });

// 刪除 修改
// createClass.delPost();
// createClass.delAllPost();
// createClass.patchPost();

// 自訂錯誤處理中間件
app.use((err, req, res, next) => {
  resFaildWrite(res, 400, "資料格式有誤");
});

app.listen(process.env.PORT, () => {
  console.log("PORT開始監聽");
});
