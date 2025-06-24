import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly addNewDeviceButton: Locator;
    readonly deleteDeviceButton: Locator;
    readonly selectAllDevices : Locator;
    readonly sortByDeviceNameButton: Locator;
    readonly sortByCountryButton: Locator;
    readonly sortByCreatedDateButton: Locator;
    readonly sortByOStypeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.addNewDeviceButton = page.getByRole('button', { name: 'add Add new' });
        this.deleteDeviceButton = page.getByRole('button', { name: 'Delete selected' });
        this.selectAllDevices = page.getByRole('row', { name: 'Device name Country Created OS' }).locator('label');
        this.sortByDeviceNameButton = page.getByRole('cell', { name: 'Device name' })
        this.sortByCountryButton = page.getByRole('cell', { name: 'Country' });
        this.sortByCreatedDateButton = page.getByRole('cell', { name: 'Created' });
        this.sortByOStypeButton = page.getByRole('cell', { name: 'OS' });
    }
}