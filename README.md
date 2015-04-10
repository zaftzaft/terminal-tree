# terminal-table

## Installation
```bash
$ npm i -g terminal-table
```

## CLI
```bash
$ terminal-table example.json
```

Output Markdown from 'tree' command.
```bash
$ tree -J | terminal-table -Tm
```


## for Node.js
```js
var tree = require("terminal-table");

var data = {
  test: [1, 2, 3, 4],
  foo: "bar"
};

console.log(tree(data, {
  symbol: true,
  padding: 1
}));
```

## API


## License
MIT
