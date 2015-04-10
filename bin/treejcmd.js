module.exports = function(data){
  var f = function(d, o){
    if(d.type === "directory"){
      o[d.name] = []
      d.contents.forEach(function(k){
        f(k, o[d.name]);
      });
    }
    else if(d.type === "file"){
      o.push(d.name);
    }
  };

  var tree = {};
  f(data[0], tree);
  return tree;
};
