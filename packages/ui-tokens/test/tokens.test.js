const test = require('node:test');
const assert = require('node:assert/strict');
const preset = require('../tailwind-preset');
const tokens = require('../../../design/tokens.json');

test('preset colours match the Stitch export', () => {
  const colors = preset.theme.extend.colors;
  for (const [name, hex] of Object.entries(tokens.colors)) {
    const key = name.replace(/_/g, '-');
    assert.equal(colors[key]?.toLowerCase(), hex.toLowerCase(), key);
  }
});

test('radii are pixel strings', () => {
  assert.equal(preset.theme.extend.borderRadius.card, '24px');
  assert.equal(preset.theme.extend.borderRadius.pill, '9999px');
});
