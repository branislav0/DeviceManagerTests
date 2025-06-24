import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CreateDevicePage } from '../pages/createDevicePage';

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
    });


    test('delete all devices', async ({ page }) => {
        await homePage.selectAllDevices.click();
        await homePage.deleteDeviceButton.click();
        await page.waitForTimeout(1000);
    });

    test('should create device and sort it by device name', async ({ page }) => {
        await homePage.addNewDeviceButton.click();
        const deviceName1 = await createDevicePage.createDevice1();
        await homePage.addNewDeviceButton.click();
        const deviceName2 = await createDevicePage.createDevice2();


        await page.waitForTimeout(1000);
        const deviceNames = await page.$$eval('table tbody tr', rows =>
            rows.map(row => {
                const cells = row.querySelectorAll('td');
                return cells[1]?.textContent?.trim();
            })
        );

        await page.waitForTimeout(1000);
        await homePage.sortByDeviceNameButton.click();
        await homePage.sortByDeviceNameButton.click();
        await page.waitForTimeout(1000);
        expect(deviceNames).toEqual([deviceName1, deviceName2]);
        await page.waitForTimeout(1000);

    });

    test('should create device and sort it by country', async ({ page }) => {
        await homePage.addNewDeviceButton.click();
        const deviceName1 = await createDevicePage.createDevice1();
        await homePage.addNewDeviceButton.click();
        const deviceName2 = await createDevicePage.createDevice2();

        //sorting
        await page.waitForTimeout(1000);
        await homePage.sortByCountryButton.click();
        await page.waitForTimeout(1000);

        const deviceNames = await page.$$eval('table tbody tr', rows =>
            rows.map(row => {
                const cells = row.querySelectorAll('td');
                return cells[1]?.textContent?.trim();
            })
        );
        await page.waitForTimeout(1000);
        expect(deviceNames).toEqual([deviceName2, deviceName1]);
        await page.waitForTimeout(1000);
    });

    test('should create device and sort it by created date', async ({ page }) => {
        await homePage.addNewDeviceButton.click();
        const deviceName1 = await createDevicePage.createDevice1();
        await homePage.addNewDeviceButton.click();
        const deviceName2 = await createDevicePage.createDevice2();

        //sorting
        await page.waitForTimeout(1000);
        await homePage.sortByCreatedDateButton.click()
        await homePage.sortByCreatedDateButton.click();
        await page.waitForTimeout(1000);
        //sorting

        const deviceNames = await page.$$eval('table tbody tr', rows =>
            rows.map(row => {
                const cells = row.querySelectorAll('td');
                return cells[1]?.textContent?.trim();
            })
        );
        await page.waitForTimeout(1000);
        expect(deviceNames).toEqual([deviceName2, deviceName1]);
        await page.waitForTimeout(1000);
    });

    test.only('should create device and sort it by OS type', async ({ page }) => {
        await homePage.addNewDeviceButton.click();
        const deviceName1 = await createDevicePage.createDevice1();
        await homePage.addNewDeviceButton.click();
        const deviceName2 = await createDevicePage.createDevice2();

        //sorting
        await page.waitForTimeout(1000);
        await homePage.sortByOStypeButton.click();
        await page.waitForTimeout(1000);
        //sorting

        const deviceNames = await page.$$eval('table tbody tr', rows =>
            rows.map(row => {
                const cells = row.querySelectorAll('td');
                return cells[1]?.textContent?.trim();
            })
        );
        await page.waitForTimeout(1000);
        expect(deviceNames).toEqual([deviceName2, deviceName1]);
        await page.waitForTimeout(1000);
    });

});