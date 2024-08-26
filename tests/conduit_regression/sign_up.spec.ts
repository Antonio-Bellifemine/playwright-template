import { test, expect } from 'playwright/test';
import {generateRandomUser} from '../../types/user.ts'; 

const user = generateRandomUser();

test.beforeEach( async ({page}) => {
    await page.goto('#/register');
});

test.describe('Can\'t sign up user without all required info', () => {
    test('Can not sign up a user without username', async ({page}) => {
        await page.getByRole('button').getByText('Sign up').click()
        await page.waitForTimeout(3000)
    });
    
    test('Can not sign up a user without email', async ({page}) => {
        await page.getByPlaceholder('Email').fill(user.email);
        await page.getByRole('button').getByText('Sign up').click()
    });
    
    test('Can not sign up a user without password', async ({page}) => {
        await page.getByPlaceholder('Password').fill(user.password);
        await page.getByRole('button').getByText('Sign up').click()
    
    });
  });


test('Can not sign up a user without username', async ({page}) => {
    await page.locator('a').getByText('Sign up').click();
    await page.getByPlaceholder('Username').fill(user.username);
    await page.getByPlaceholder('Email').fill(user.email);
    await page.getByPlaceholder('Password').fill(user.password);
    await page.getByRole('button').getByText('Sign up').click()
    await page.waitForTimeout(3000)
});