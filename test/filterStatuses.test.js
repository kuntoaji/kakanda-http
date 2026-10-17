import { test } from 'node:test';
import assert from 'node:assert/strict';
import HTTP_STATUSES from '../modules/HTTP_STATUSES.js';
import { groupStatuses, rfcLabel } from '../modules/filterStatuses.js';

const codes = (groups) => groups.flatMap((group) => group.statuses.map((status) => status.code));

test('an empty query returns every status, grouped by class in order', () => {
  const groups = groupStatuses(HTTP_STATUSES, '  ');
  assert.deepEqual(groups.map((group) => group.name), [
    '1xx Informational', '2xx Success', '3xx Redirection', '4xx Client Error', '5xx Server Error',
  ]);
  assert.deepEqual(codes(groups), HTTP_STATUSES.map((status) => status.code));
});

test('matches by code', () => {
  assert.deepEqual(codes(groupStatuses(HTTP_STATUSES, '404')), ['404']);
});

test('matches phrase and summary case-insensitively', () => {
  assert.ok(codes(groupStatuses(HTTP_STATUSES, 'TEAPOT')).includes('418'));
  assert.deepEqual(codes(groupStatuses(HTTP_STATUSES, 'rate limiting')), ['429']);
});

test('every word must match, in any order', () => {
  assert.deepEqual(codes(groupStatuses(HTTP_STATUSES, 'timeout gateway')), ['504']);
});

test('matches by class name and drops empty groups', () => {
  const groups = groupStatuses(HTTP_STATUSES, 'redirection');
  assert.deepEqual(groups.map((group) => group.digit), ['3']);
});

test('returns no groups when nothing matches', () => {
  assert.deepEqual(groupStatuses(HTTP_STATUSES, 'no-such-status'), []);
});

test('every status has a unique code and an RFC Editor reference', () => {
  const unique = new Set(HTTP_STATUSES.map((status) => status.code));
  assert.equal(unique.size, HTTP_STATUSES.length);
  for (const status of HTTP_STATUSES) {
    assert.match(status.reference, /^https:\/\/www\.rfc-editor\.org\/rfc\/rfc\d+/);
  }
});

test('no status cites an RFC that RFC 9110 made obsolete', () => {
  for (const status of HTTP_STATUSES) {
    assert.doesNotMatch(status.reference, /rfc723[1235]\b/, status.code);
  }
});

test('rfcLabel formats the RFC number and section', () => {
  assert.equal(rfcLabel('https://www.rfc-editor.org/rfc/rfc9110#section-15.5.5'), 'RFC 9110, section 15.5.5');
  assert.equal(rfcLabel('https://www.rfc-editor.org/rfc/rfc6585'), 'RFC 6585');
  assert.equal(rfcLabel('https://example.com/spec'), 'https://example.com/spec');
});
