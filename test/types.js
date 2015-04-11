var tree = require("../");
var data = {
  "string": "str",
  "number in array": [1, 2, 3, 4],
  "sub object": {
    "null": null,
    "true": true,
    "false": false,
    "undefined": void 0,
    "regexp": /^\d+$/,
    "NaN": NaN,
    "Infinity": Infinity,
    "function": require("path")
  }
};

console.log(tree(data, {highlight: true}));
