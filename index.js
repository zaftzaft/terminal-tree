var chalk = require("chalk");
var ansi256 = require("ansi-256-colors");

function isFunction(f){
  return Object.prototype.toString.call(f) === "[object Function]";
}

function isRegExp(r){
  return r instanceof RegExp;
}

function isObject(o){
  return !Array.isArray(o) && !isFunction(o) && !isRegExp(o) && o === new Object(o);
}

var reColorName = /^(black|red|green|yellow|blue|magenta|cyan|white|gray)$/;
function coloring(str, color){
  str = str + "";
  if(typeof color === "function"){
    return color(str);
  }
  else if(reColorName.test(color)){
    return chalk[color](str);
  }
  else if(typeof color === "number" && 0 <= color && color < 256){
    return ansi256.fg.codes[color] + str + ansi256.reset;
  }
  else{
    return str;
  }
};

var defaultColors = {
  "string": "yellow",
  "number": "red",
  "boolean": "blue",
  "infinity": "red",
  "nan": "cyan",
  "null": "cyan",
  "undefined": "gray",
  "regexp": "green",
  "key": "magenta",
  "object": "white",
  "array": "white"
};


module.exports = function(json, options){
  options = options || {};
  if(options.symbol === undefined){
    options.symbol = true;
  }
  options.padding = options.padding || 0;
  options.markdown = options.markdown || false;
  options.highlight = options.highlight || false;
  options.colors = options.colors || {};

  Object.keys(defaultColors).forEach(function(key){
    options.colors[key] = options.colors[key] || defaultColors[key];
  });

  var output = "";
  var tree = function(o, depth, index, isLast, inArray, type){
    index = [].concat(index || []);
    depth = depth || 0;
    index[depth] = 0;

    if(Array.isArray(o)){
      if(inArray){
        if(options.symbol){
          tree("[]", depth, index, isLast, 0, "array");
          index[depth] = isLast ? 0 : 1;
        }
        else{
          depth--;
        }
      }
      for(var i = 0, l = o.length;i < l;i++){
        tree(o[i], depth + 1, index, i === l - 1, 1);
      }
    }
    else if(isObject(o)){
      var keys = Object.keys(o);
      if(inArray){
        if(options.symbol){
          tree("{}", depth, index, isLast, 0, "object");
          index[depth] = isLast ? 0 : 1;
          depth++;
        }
      }
      for(var i = 0, l = keys.length;i < l;i++){
        var lastFlg = (inArray && !isLast && !options.symbol) ? false : (i === l - 1);

        tree(keys[i], depth, index, lastFlg, 0, "key");
        index[depth] = lastFlg ? 0 : 1;
        tree(o[keys[i]], depth + 1, index, 1, 1);
      }
    }
    else{
      index[depth] = isLast ? 3 : 2;
      if(isFunction(o)){
        o = "Function";
        type = "function";
      }

      if(options.markdown){
        output += markdownList(depth) + o + "\n";
      }
      else{
        output += format(index) + highlight(o, type) + "\n";
      }

    }
  };

  var format = function(index){
    var s = "";
    var p = new Array(options.padding + 1).join(" ");
    for(var i = 0, l = index.length;i < l;i++){
      switch(index[i]){
        case 1: s += "┃"; break;
        case 2: s += "┣ "; break;
        case 3: s += "┗ "; break;
        default: s += " ";
      }
      if(i < l - 1){ s += p; }
    }
    return s;
  };

  var markdownList = function(depth){
    return new Array(depth + 1).join("  ") + "+ ";
  };

  var highlight = function(data, type){
    var hi;
    if(!options.highlight){
      return data;
    }
    if(type === "key"){
      hi = "key";
    }
    else if(type === "array"){
      hi = "array";
    }
    else if(type === "object"){
      hi = "object";
    }
    else if(data !== data){
      hi = "nan";
    }
    else if(data === Infinity){
      hi = "infinity";
    }
    else if(typeof data === "string"){
      hi = "string";
    }
    else if(typeof data === "number"){
      hi = "number";
    }
    else if(isRegExp(data)){
      hi = "regexp";
    }
    else if(typeof data === "boolean"){
      hi = "boolean";
    }
    else if(data === null){
      hi = "null";
    }
    else if(data === void 0){
      hi = "undefined";
    }
    else{
      return data;
    }
    return coloring(data, options.colors[hi]);
  };

  tree(json);
  return output;
};
