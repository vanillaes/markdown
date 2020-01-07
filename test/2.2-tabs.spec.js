/* eslint-disable no-template-curly-in-string */
import test from 'tape';
import markdown from '../index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const ex1 = require('./fixtures/1.json');
const ex2 = require('./fixtures/2.json');
const ex3 = require('./fixtures/3.json');

test('Example 1 - a tab can be used instead of spaces in an indented code block', (t) => {
  const input = ex1.input.join('\n');
  const expect = ex1.expect.join('\n');
  const result = markdown(input);

  t.deepEqual(result, expect);

  t.end();
});

test('Example 2 - mixed tabs and spaces can be used to indent a code block', (t) => {
  const input = ex2.input.join('\n');
  const expect = ex2.expect.join('\n');
  const result = markdown(input);

  t.deepEqual(result, expect);

  t.end();
});

test('Example 3 - indented code blocks can span multiple lines', (t) => {
  const input = ex3.input.join('\n');
  const expect = ex3.expect.join('\n');
  const result = markdown(input);

  t.deepEqual(result, expect);

  t.end();
});
