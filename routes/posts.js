const { resSuccessWrite, resFaildWrite } = require("../module/resModule");
const { Post } = require("../model/PostModel");
// const { validateKey } = require("../module/validateModule");

class apiClass {
  constructor(app) {
    this.app = app;
    this.Post = Post;
  }

  getPost() {
    this.app.get(`/post`, async (req, res) => {
      try {
        const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
        const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
        const data = await this.Post.find(q).populate({
          path: "user",
          select: "name photo",
        }).sort(timeSort);
        resSuccessWrite(res, 200, data);
      } catch (error) {
        resFaildWrite(res, 400, "請求出錯!!!");
      }
    });
  }
  postPost() {
    this.app.post("/post", async (req, res) => {
      try {
        console.log();
        const reqObj = req.body;
        const { user, content } = reqObj;
        if (user !== undefined && content !== undefined) {
          const newPost = await this.Post.create(reqObj);
          resSuccessWrite(res, 200, newPost);
        } else {
          resFaildWrite(res, 400, "資料屬性值缺少");
        }
      } catch (error) {
        next();
      }
    });
  }
  notFound() {
    this.app.get("/:notfoundrouter", (req, res) => {
      res.send(`找不到 ${req.params.notfoundrouter} 路徑`);
    });
  }
  reqOptions() {
    this.app.use((req, res, next) => {
      if (req.method === "OPTIONS") {
        res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.status(200).send("options 200");
      }
    });
  }
  
  // 刪除 修改
  // delPost() {
  //   this.app.delete("/post/:postId", async (req, res) => {
  //     try {
  //       const id = req.params.postId;
  //       const delStatus = await this.Post.findByIdAndDelete(id);
  //       if (delStatus !== null) {
  //         resSuccessWrite(res, 200, "刪除成功");
  //       } else {
  //         resFaildWrite(res, 400, "找無資料");
  //       }
  //     } catch (error) {
  //       resFaildWrite(res, 400, "刪除失敗");
  //     }
  //   });
  // }
  // delAllPost() {
  //   this.app.delete("/post", async (req, res) => {
  //     try {
  //       await this.Post.deleteMany({});
  //       resSuccessWrite(res, 200, "資料清空");
  //     } catch (error) {
  //       resFaildWrite(res, 400, "清空失敗");
  //     }
  //   });
  // }
  // patchPost() {
  //   this.app.patch("/post/:postId", async (req, res) => {
  //     try {
  //       const id = req.params.postId;
  //       const reqObj = req.body;
  //       const isNull = await this.Post.findByIdAndUpdate(id, reqObj);
  //       if (isNull === null) throw new Error(); // 找不到id就丟出
  //       validateKey(Object.keys(reqObj)); // 有非規定key就丟出
  //       resSuccessWrite(res, 200, "更新成功");
  //     } catch (error) {
  //       resFaildWrite(res, 400, "更新失敗，請檢察路徑、欄位、值");
  //     }
  //   });
  // }
}

module.exports = { apiClass };
