import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {CreateDevicePage} from "../pages/createDevicePage";
import {expect, test} from "@playwright/test";

test.only('Happy path: user logs in, creates a device, sees it in the list and deletes it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const createDevicePage = new CreateDevicePage(page);

    await loginPage.gotoLoginPage();
    await loginPage.loginCorrectCredentials();

    await homePage.addNewDeviceButton.click();
    const deviceName = await createDevicePage.createDevice1();

    await expect(page.getByText(deviceName)).toBeVisible();

    await page.getByRole('row', { name: deviceName }).locator('span').nth(2).click();
    await homePage.deleteDeviceButton.click();
    await expect(page.getByText(deviceName)).not.toBeVisible();
});
