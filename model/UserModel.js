const mongoose = require("mongoose");

const [schema, options] = [
  {
    name: {
      type: String,
      required: [true, "名稱 未填寫"],
    },
    email:{
      type: String,
      required: [true, "名稱 未填寫"],
      select: false
    },
    image: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false,
  },
];

const userSchema = new mongoose.Schema(schema, options); // 設定Schema
const User = mongoose.model("user", userSchema); // 關聯

module.exports = { User };
