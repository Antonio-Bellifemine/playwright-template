import { test, expect, BrowserContext, Page } from '@playwright/test';
import {generateRandomUser} from '../../types/user.ts'; 


test.beforeEach(async ({ page }) => {
  await page.goto('https://my.embracepetinsurance.com/#/Register');
});

const user = generateRandomUser();


test.describe('Can\'t register without all required info', () => {
    test('Can not sign up a user without first name', async ({page}) => {
        await page.locator('[id="registration\\[last_name\\]"]').fill(user.lastName);
        await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
        await page.locator('[id="registration\\[password\\]"]').fill(user.password);
        await page.locator('[id="registration\\[password_confirmation\\]"]').fill(user.password);
        await page.getByText('I have read and agree with').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        // the invalid sign up errors should be visible
        await expect(page.getByText('Error: \'First Name\' must not')).toBeVisible();
        await expect(page.locator('#main')).toContainText('Error: \'First Name\' must not be empty.');
    });

    test('Can not sign up a user without username', async ({page}) => {  
        // fill in inputs except username      
        await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
        await page.locator('[id="registration\\[last_name\\]"]').fill(user.lastName);
        await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
        await page.locator('[id="registration\\[password\\]"]').fill(user.password);
        await page.locator('[id="registration\\[password_confirmation\\]"]').fill(user.password);
        await page.getByText('I have read and agree with').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        // the invalid sign up errors should contain the correct error text
        await expect(page.getByText('Error: \'User Name\' must not')).toBeVisible();
        await expect(page.locator('#main')).toContainText('Error: \'User Name\' must not be empty.');
    });

    test('Can not sign up a user without last name', async ({page}) => {
        await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
        await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
        await page.locator('[id="registration\\[password\\]"]').fill(user.password);
        await page.locator('[id="registration\\[password_confirmation\\]"]').fill(user.password);
        await page.getByText('I have read and agree with').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        // the invalid sign up errors should be visible
        await expect(page.getByText('Error: \'Last Name\' must not')).toBeVisible();
        await expect(page.locator('#main')).toContainText('Error: \'Last Name\' must not be empty.');
    });

    test('Can not sign up a user without Email', async ({page}) => {
        await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
        await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="registration\\[password\\]"]').fill(user.password);
        await page.locator('[id="registration\\[password_confirmation\\]"]').fill(user.password);
        await page.getByText('I have read and agree with').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        // the invalid sign up errors should be visible
        await expect(page.getByText('Error: \'Email Address\' must')).toBeVisible();
        // the invalid sign up errors should contain the correct error text
        await expect(page.locator('#main')).toContainText('Error: \'Email Address\' must not be empty.');

    });

    test('Can not sign up a user without password', async ({page}) => {
        await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
        await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
        await page.locator('[id="registration\\[password_confirmation\\]"]').fill(user.password);
        await page.getByText('I have read and agree with').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        // the invalid sign up errors should be visible
        await expect(page.getByText('Error: \'Password\' must not be')).toBeVisible();
        await expect(page.locator('#main')).toContainText('Error: \'Password\' must not be empty.');
    });

    test('Can not sign up a user without confirm password', async ({page}) => {
        await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
        await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
        await page.locator('[id="registration\\[password\\]"]').fill(user.password);
        await page.getByText('I have read and agree with').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        // the invalid sign up errors should be visible
        await expect(page.getByText('Error: \'Confirm Password\' must not be')).toBeVisible();
        // the invalid sign up errors should contain the correct error text
        await expect(page.locator('#main')).toContainText('Error: \'Confirm Password\' must not be empty.');

    });

    test('Can not sign up a user without agreeing to terms', async ({page}) => {
        await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
        await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
        await page.locator('[id="registration\\[password_confirmation\\]"]').fill(user.password);
        await page.getByRole('button', { name: 'Submit' }).click();
        // the invalid sign up errors should be visible
        await expect(page.getByText('Error: You must agree to the')).toBeVisible();
        // the invalid sign up errors should contain the correct error text
        await expect(page.locator('#main')).toContainText('Error: You must agree to the Terms of Use to proceed.');
    });

    test('password must meet minimum requirements', async ({page}) => {
        await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
        await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
        await page.locator('[id="registration\\[password\\]"]').fill(user.password);
        await page.locator('[id="registration\\[password_confirmation\\]"]').fill(user.password);
        await page.getByText('I have read and agree with').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.getByText('Error: \'Password\' does not')).toBeVisible();
        await expect(page.locator('#main')).toContainText('Error: \'Password\' does not meet the minimum security requirements. A password must have 3 of the following: a lower case letter, an upper case letter, a number, or a special character. ex: Embrac3.me!');
    });
    test.describe('User can successfuly register', () => {

        test('password must meet minimum requirements', async ({page}) => {
            await page.locator('[id="registration\\[first_name\\]"]').fill(user.firstName);
            await page.locator('[id="registration\\[user_name\\]"]').fill(user.username);
            await page.locator('[id="registration\\[email_address\\]"]').fill(user.email);
            await page.locator('[id="registration\\[password\\]"]').fill(user.password);
            await page.locator('[id="registration\\[password_confirmation\\]"]').fill(`${user.password}B123`);
            await page.locator('[id="registration\\[password_confirmation\\]"]').fill(`${user.password}B123`);
            await page.getByText('I have read and agree with').click();
            await page.getByRole('button', { name: 'Submit' }).click();       
        });
    });
});