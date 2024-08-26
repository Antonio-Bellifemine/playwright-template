import { test, expect } from 'playwright/test';
import {generateRandomUser} from '../../types/user.ts'; 

const user = generateRandomUser();

test.beforeEach( async ({page}) => {
    await page.goto('/');
});

test('go to sign in page', async ({page}) => {
    // await page.locator('a').getByText('MyEmbrace Login').click();
    await page.getByRole('link', { name: 'MyEmbrace Login' }).click();
    // await page.getByPlaceholder('Email').fill(user.username);
    // await page.getByPlaceholder('Password').fill(user.email);
});

test('click for price goes to quote page', async ({page}) => {
    await page.locator('#homepageHero').getByRole('button', { name: 'Click for Price' }).click();
    // await page.getByPlaceholder('Username').fill(user.username);
    // await page.getByPlaceholder('Email').fill(user.email);
    // await page.getByPlaceholder('Password').fill(user.password);
});

test('get quote goes to quoting page', async ({page}) => {
    await page.locator('a').getByText(' Get Quote ');
    // Explicitly wait for the element to be attached and visible in the DOM
    // const popularTags = page.locator('p').getByText('Popular Tags');
    // await expect(popularTags).toBeVisible();
});