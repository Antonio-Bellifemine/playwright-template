import { test, expect } from 'playwright/test';
import {generateRandomUser} from '../../types/user.ts'; 

const user = generateRandomUser();

test.beforeEach( async ({page}) => {
    await page.goto('https://my.embracepetinsurance.com/#/Login');
});

test.describe('error message shows when wrong login credentials are used', () => {
    test('Can not sign up a user without username', async ({page}) => {
        await page.locator('[id="login\\[user_name\\]"]').click();
        await page.locator('[id="login\\[user_name\\]"]').fill(user.username);
        await page.locator('[id="login\\[password\\]"]').fill(user.password);
        await page.getByText('Remember me on this computer?').click();
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.getByText('Error: Please try again. The')).toBeVisible();
        await expect(page.locator('#main')).toContainText('Error: Please try again. The Username or Password you entered is incorrect.');
    });
    test.step('Can not sign up a user without username', async () => {

    });
  });