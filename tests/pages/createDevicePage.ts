import { Locator, Page } from '@playwright/test';

export class CreateDevicePage {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly osTypeInput: Locator;
    readonly countryCodeInput: Locator;
    readonly saveDeviceButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByRole('textbox', { name: 'Device name' });
        this.osTypeInput = page.getByRole('textbox', { name: 'OS type' });
        this.countryCodeInput = page.getByRole('textbox', { name: 'Country code' });
        this.saveDeviceButton = page.getByRole('button', { name: 'Save' });
    }

    async createDevice1(): Promise<string> {
        const deviceName1 = 'Test device 1'+ " " + Math.floor(Math.random() * 1000);
        await this.nameInput.fill(deviceName1);
        await this.osTypeInput.click();
        await this.page.getByRole('listitem').filter({ hasText: 'iPhone' }).click();
        await this.countryCodeInput.fill('01701');
        await this.saveDeviceButton.click();
        return deviceName1;
    }
    async createDevice2(): Promise<string> {
        const deviceName2 = 'Test device 2'+ " " + Math.floor(Math.random() * 1000);
        await this.nameInput.fill(deviceName2);
        await this.osTypeInput.click();
        await this.page.getByRole('listitem').filter({ hasText: 'Android' }).click();
        await this.countryCodeInput.fill('01507');
        await this.saveDeviceButton.click();
        return deviceName2;
    }
}
