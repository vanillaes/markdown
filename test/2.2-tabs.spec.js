/* eslint-disable no-template-curly-in-string */
import test from 'tape';
import markdown from '../index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ex1 = require('./fixtures/1.json');

test('Example 1 - a tab can be used instead of spaces in an indented code block', (t) => {
  const input = ex1.input.join('\n');
  const expect = ex1.expect.join('\n');
  const result = markdown(input);

  t.deepEqual(result, expect);

  t.end();
});
