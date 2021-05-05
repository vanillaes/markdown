var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// index.js
__markAsModule(exports);
__export(exports, {
  default: () => parse
});
function parse(markdown = "") {
  const states = {
    blankline: 1,
    code: 2
  };
  const tags = {
    code: {
      open: "<pre><code>",
      close: "</code></pre>"
    }
  };
  let state = states.blankline;
  let spaces = 0;
  const ctx = Object.create(null);
  ctx.value = "";
  ctx.output = "";
  const lexer = /\t|\s|\n|\r|[^\t\n\r]+/y;
  const output = () => {
    ctx.output += ctx.value;
    ctx.value = "";
  };
  let tokens = [];
  let match = "";
  let end = false;
  while ((tokens = lexer.exec(markdown)) !== null) {
    match = tokens[0];
    end = lexer.lastIndex === markdown.length;
    if (state === states.blankline) {
      switch (match) {
        case "	":
          spaces += 4;
          continue;
        case " ":
          spaces += 1;
          continue;
        default:
          if (spaces >= 4) {
            state = states.code;
            spaces = 0;
          }
          break;
      }
    }
    if (state === states.code) {
      if (ctx.value === "") {
        ctx.value += tags.code.open;
      }
      if (/\n|\r/.test(match)) {
        ctx.value += "\n";
        state = states.blankline;
        continue;
      }
      ctx.value += match;
      if (end) {
        ctx.value += "\n" + tags.code.close;
        output();
      }
    }
  }
  return ctx.output;
}
