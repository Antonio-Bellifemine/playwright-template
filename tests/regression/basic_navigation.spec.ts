import { test } from 'playwright/test';

test('basic navigation', async ({page}) => {
    await page.goto('https://demo.realworld.io/#/');
    await page.waitForTimeout(10000);
    await page.reload();
});