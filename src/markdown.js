export default function parse (markdown = '') {
  // TODO: Add input checking

  const states = {
    blankline: 1,
    code: 2
  };

  const tags = {
    code: {
      open: '<pre><code>',
      close: '</code></pre>'
    }
  };

  let state = states.blankline;
  let spaces = 0;
  const ctx = Object.create(null);
  ctx.value = '';
  ctx.output = '';

  const lexer = RegExp(/\t|\s|[^\t]+/y);
  const output = () => { ctx.output += ctx.value; ctx.value = ''; };
  let tokens = [];
  let match = '';
  let end = false;
  while ((tokens = lexer.exec(markdown)) !== null) {
    match = tokens[0];
    end = lexer.lastIndex === markdown.length;

    if (state === states.blankline) {
      switch (match) {
        case '\t': // start of entry
          spaces += 4;
          continue;
        case ' ':
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
      if (ctx.value === '') { ctx.value += tags.code.open; }
      ctx.value += match;
      if (end) {
        ctx.value += '\n' + tags.code.close;
        output();
      }
    }
  }
  // // flush the last value
  // if (ctx.entry.length !== 0) {
  //   this.valueEnd(ctx);
  //   this.entryEnd(ctx);
  // }

  return ctx.output;
}
