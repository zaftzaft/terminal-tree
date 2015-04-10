var tree = require("../");

var data = {
  "content": [
    "video",
    "music",
    {
      "picture": [
        "1920x1080",
        "1600x900"
      ]
    }
  ]
};

console.log(tree(data, {
  symbol: false
}));
