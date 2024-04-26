// patch 驗證 key 是否有另外屬性
const keyArray = [
  "name",
  "content",
  "type",
  "image",
  "likes",
  "comments",
  "tags",
];

function validateKey(keyParams) {
  for (const key of keyParams) {
    if (!keyArray.includes(key)) throw new Error();
  }
}

module.exports = { validateKey };
