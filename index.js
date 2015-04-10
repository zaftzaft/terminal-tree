function isObject(o){
  return !Array.isArray(o) && o === new Object(o);
}
var format = function(index){
  var s = "";
  for(var i = 0, l = index.length;i < l;i++){
    switch(index[i]){
      case 1: s += "┃"; break;
      case 2: s += "┣ "; break;
      case 3: s += "┗ "; break;
      default: s += " ";
    }
  }
  return s;
};


module.exports = function(json, options){
  options = options || {};
  if(options.symbol === undefined){
    options.symbol = true;
  }

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
        tree(keys[i], depth, index, i === l - 1);
        index[depth] = (i === l - 1) ? 0 : 1;
        tree(o[keys[i]], depth + 1, index, 1, 1);
      }
    }
    else{
      index[depth] = isLast ? 3 : 2;
      output += format(index) + o + "\n";
    }
  };
  tree(json);
  return output;
};
