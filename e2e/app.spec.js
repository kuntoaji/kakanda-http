import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const items = (page) => page.locator('.kakanda-http__result__item');
const search = (page) => page.getByLabel('Search by code or message');

test('lists every status code grouped by class', async ({ page }) => {
  await page.goto('/');
  await expect(items(page)).toHaveCount(63);
  await expect(page.locator('.kakanda-http__group__title')).toHaveText([
    '1xx Informational', '2xx Success', '3xx Redirection', '4xx Client Error', '5xx Server Error',
  ]);
});

test('every typed word must match, and an empty result shows a message', async ({ page }) => {
  await page.goto('/');
  await search(page).fill('timeout gateway');
  await expect(items(page).locator('h3')).toHaveText(['504 Gateway Timeout']);

  await search(page).fill('no-such-status');
  await expect(items(page)).toHaveCount(0);
  await expect(page.getByText('No status codes match your search.')).toBeVisible();
});

test('a #code anchor scrolls to that code', async ({ page }) => {
  await page.goto('/#504');
  await expect(page.locator('[id="504"]')).toBeInViewport();
});

test('?q= pre-fills the search and typing updates the URL', async ({ page }) => {
  await page.goto('/?q=retry-after#429');
  await expect(search(page)).toHaveValue('retry-after');
  await expect(items(page).locator('h3')).toHaveText(['429 Too Many Requests', '503 Service Unavailable']);

  await search(page).fill('gateway timeout');
  await expect(page).toHaveURL('/?q=gateway+timeout#429');

  await search(page).fill('');
  await expect(page).toHaveURL('/#429');
});

test('/ focuses the search and Esc clears it', async ({ page }) => {
  await page.goto('/');
  await expect(items(page)).toHaveCount(63);
  await page.keyboard.press('/');
  await expect(search(page)).toBeFocused();
  await expect(search(page)).toHaveValue('');

  await page.keyboard.type('404');
  await page.keyboard.press('Escape');
  await expect(search(page)).toHaveValue('');
  await expect(items(page)).toHaveCount(63);
});

test('Copy link copies the link to the code', async ({ page, context, baseURL }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const item = page.locator('[id="404"]');
  await item.getByRole('button', { name: 'Copy link to 404 Not Found' }).click();
  await expect(item.getByText('Copied')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`${baseURL}/#404`);
});

test('shows headers, cacheability, notes and RFC 9110 links', async ({ page }) => {
  await page.goto('/');
  const item = page.locator('[id="301"]');
  await expect(item.getByText('Cacheable by default')).toBeVisible();
  await expect(item.locator('code')).toHaveText(['Location']);
  await expect(item.getByText(/Use 308 to keep the request method/)).toBeVisible();
  await expect(item.getByRole('link', { name: 'RFC 9110, section 15.4.2' }))
    .toHaveAttribute('href', 'https://www.rfc-editor.org/rfc/rfc9110#section-15.4.2');
  await expect(page.locator('[id="305"]').getByText('Deprecated', { exact: true })).toBeVisible();
});

test('has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expect(items(page)).toHaveCount(63);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('fits a 375px phone screen without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await expect(items(page)).toHaveCount(63);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('makes no third-party requests and logs no errors', async ({ page, baseURL }) => {
  const problems = [];
  page.on('request', (request) => {
    if (!request.url().startsWith(baseURL)) problems.push(`request: ${request.url()}`);
  });
  page.on('console', (message) => message.type() === 'error' && problems.push(`console: ${message.text()}`));
  page.on('pageerror', (error) => problems.push(`error: ${error.message}`));
  await page.goto('/');
  await expect(items(page)).toHaveCount(63);
  expect(problems).toEqual([]);
});
