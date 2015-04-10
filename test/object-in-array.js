var tree = require("../");

var data = {
  ary: [
    1,
    2,
    {a:3, b: 3.4},
    4,
    {b: 5, c: "100"},
    10
  ],
  x: 1
};

console.log(tree(data, {
  padding: 1
}));
console.log(tree(data, {
  padding: 1,
  symbol: false
}));
