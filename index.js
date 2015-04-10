function isObject(o){
  return !Array.isArray(o) && o === new Object(o);
}


module.exports = function(json, options){
  options = options || {};
  if(options.symbol === undefined){
    options.symbol = true;
  }
  options.padding = options.padding || 0;
  options.markdown = options.markdown || false;

  var output = "";
  var tree = function(o, depth, index, isLast, inArray){
    index = [].concat(index || []);
    depth = depth || 0;
    index[depth] = 0;
  
    if(Array.isArray(o)){
      if(inArray){
        if(options.symbol){
          tree("[]", depth, index, isLast);
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
          tree("{}", depth, index, isLast);
          index[depth] = isLast ? 0 : 1;
          depth++;
        }
      }
      for(var i = 0, l = keys.length;i < l;i++){
        var lastFlg = (inArray && !isLast && !options.symbol) ? false : (i === l - 1);

        tree(keys[i], depth, index, lastFlg);
        index[depth] = lastFlg ? 0 : 1;
        tree(o[keys[i]], depth + 1, index, 1, 1);
      }
    }
    else{
      index[depth] = isLast ? 3 : 2;

      if(options.markdown){
        output += markdownList(depth) + o + "\n";
      }
      else{
        output += format(index) + o + "\n";
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


  tree(json);
  return output;
};
