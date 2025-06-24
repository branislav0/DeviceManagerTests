import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CreateDevicePage } from '../pages/createDevicePage';
import { createDevicesAndVerify, getDeviceNamesFromTable } from '../helpers/testHelpers';

test.describe('Device Creation – User Story 3', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let createDevicePage: CreateDevicePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        createDevicePage = new CreateDevicePage(page);

        await loginPage.gotoLoginPage();
        await loginPage.loginCorrectCredentials();

        await homePage.selectAllDevices.click();
        await homePage.deleteDeviceButton.click();

        await expect(page.locator('table tbody tr')).toHaveCount(0);
    });

    test('should create devices and sort by device name', async ({ page }) => {
        const [device1, device2] = await createDevicesAndVerify(page, homePage, createDevicePage);

        await homePage.sortByDeviceNameButton.click();
        await homePage.sortByDeviceNameButton.click();

        const deviceNames = await getDeviceNamesFromTable(page);
        expect(deviceNames).toEqual([device2, device1]);
    });

    test('should create devices and sort by country', async ({ page }) => {
        const [device1, device2] = await createDevicesAndVerify(page, homePage, createDevicePage);

        await homePage.sortByCountryButton.click();

        const deviceNames = await getDeviceNamesFromTable(page);
        expect(deviceNames).toEqual([device2, device1]);
    });

    test('should create devices and sort by created date', async ({ page }) => {
        const [device1, device2] = await createDevicesAndVerify(page, homePage, createDevicePage);

        await homePage.sortByCreatedDateButton.click();
        await homePage.sortByCreatedDateButton.click();

        const deviceNames = await getDeviceNamesFromTable(page);
        expect(deviceNames).toEqual([device2, device1]);
    });

    test('should create devices and sort by OS type', async ({ page }) => {
        const [device1, device2] = await createDevicesAndVerify(page, homePage, createDevicePage);

        await homePage.sortByOStypeButton.click();

        const deviceNames = await getDeviceNamesFromTable(page);
        expect(deviceNames).toEqual([device2, device1]);
    });
});