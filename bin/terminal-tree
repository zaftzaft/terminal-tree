#!/usr/bin/env node
var fs = require("fs");
var program = require("commander");
var tree = require("../");
var treejcmd = require("./treejcmd");

var options = {};
var mode = "json";
var launcher = function(data){
  console.log(tree(data, options));
};

var parse = function(data){
  if(mode === "json"){
    return JSON.parse(data);
  }
  else if(mode === "treeJson"){
    return treejcmd(JSON.parse(data));
  }
}

program
.usage("[options] <file ...>")
.version("0.0.1")
.option("-S --hide-symbol", "hidden symbol")
.option("-m --markdown", "parse to Markdown")
.option("-T --tree-json", "parse from `tree -J` command")
.parse(process.argv);

if(program.markdown){
  options.markdown = true;
  options.symbol = false;
}
if(program.hideSymbol){
  options.symbol = false;
}
if(program.treeJson){
  mode = "treeJson";
}

if(program.args.length){
  fs.readFile(program.args[0], "utf8", function(err, data){
    if(err){ throw err; }
    launcher(parse(data));
  });
}

process.stdin.isTTY || (function(){
  var data = "";
  process.stdin.resume();
  process.stdin.on("data", function(chunk){
    data += chunk;
  });
  process.stdin.on("end", function(){
    launcher(parse(data));
  });

})();
