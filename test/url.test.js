import { test } from 'node:test';
import assert from 'node:assert/strict';
import { queryFromSearch, searchWithQuery } from '../modules/url.js';

test('queryFromSearch reads and decodes q', () => {
  assert.equal(queryFromSearch('?q=gateway+timeout'), 'gateway timeout');
  assert.equal(queryFromSearch('?q=retry-after&x=1'), 'retry-after');
});

test('queryFromSearch returns an empty string without q', () => {
  assert.equal(queryFromSearch(''), '');
  assert.equal(queryFromSearch('?x=1'), '');
});

test('searchWithQuery sets q and keeps other parameters', () => {
  assert.equal(searchWithQuery('', '404'), '?q=404');
  assert.equal(searchWithQuery('?x=1&q=old', 'gateway timeout'), '?x=1&q=gateway+timeout');
});

test('searchWithQuery removes q for a blank query', () => {
  assert.equal(searchWithQuery('?q=404', ''), '');
  assert.equal(searchWithQuery('?q=404&x=1', '  '), '?x=1');
});

test('the two helpers round-trip', () => {
  const query = 'a&b=c #d';
  assert.equal(queryFromSearch(searchWithQuery('', query)), query);
});
