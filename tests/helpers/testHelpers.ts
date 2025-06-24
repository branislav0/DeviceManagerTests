import { Page, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { CreateDevicePage } from '../pages/createDevicePage';

export async function createDevicesAndVerify(
    page: Page,
    homePage: HomePage,
    createDevicePage: CreateDevicePage
): Promise<[string, string]> {
    await homePage.addNewDeviceButton.click();
    const device1 = await createDevicePage.createDevice1();

    await homePage.addNewDeviceButton.click();
    const device2 = await createDevicePage.createDevice2();

    await expect(page.locator('table tbody tr')).toHaveCount(2);

    return [device1, device2];
}

export async function getDeviceNamesFromTable(page: Page): Promise<string[]> {
    const rows = page.locator('table tbody tr');
    const rowCount = await rows.count();

    const names: string[] = [];
    for (let i = 0; i < rowCount; i++) {
        const cell = rows.nth(i).locator('td').nth(1);
        const text = await cell.textContent();
        names.push(text?.trim() || '');
    }

    return names;
}
