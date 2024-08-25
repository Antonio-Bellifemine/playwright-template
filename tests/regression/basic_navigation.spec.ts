import { test, expect } from 'playwright/test';
import {generateRandomUser} from '../../types/user.ts'; 

const user = generateRandomUser();

test.beforeEach( async ({page}) => {
    await page.goto('https://demo.realworld.io/#/');
});

test('go to sign in page', async ({page}) => {
    await page.locator('a').getByText('Sign in').click();
    await page.getByPlaceholder('Email').fill(user.username);
    await page.getByPlaceholder('Password').fill(user.email);
});

test('go to sign up page', async ({page}) => {
    await page.locator('a').getByText('Sign up').click();
    await page.getByPlaceholder('Username').fill(user.username);
    await page.getByPlaceholder('Email').fill(user.email);
    await page.getByPlaceholder('Password').fill(user.password);
});

test('go to home page', async ({page}) => {
    await page.locator('a').getByText('Global Feed');
    // Explicitly wait for the element to be attached and visible in the DOM
    const popularTags = page.locator('p').getByText('Popular Tags');
    await expect(popularTags).toBeVisible();
});