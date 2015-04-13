var tree = require("../");
var chalk = require("chalk");

var data = {
  x: "str",
  y: 1
};

console.log(tree(data, {
  highlight: true,
  colors: {
    "string": 200, // ansi 256 colors
    "number": chalk.green // function
  }
}));
