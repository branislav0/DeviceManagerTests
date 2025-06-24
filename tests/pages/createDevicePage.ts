import { Locator, Page } from '@playwright/test';

export class CreateDevicePage {
    readonly nameInput: Locator;
    readonly osTypeInput: Locator;
    readonly countryCodeInput: Locator;
    readonly saveDeviceButton: Locator;

    constructor(readonly page: Page) {
        this.nameInput = page.getByRole('textbox', { name: 'Device name' });
        this.osTypeInput = page.getByRole('textbox', { name: 'OS type' });
        this.countryCodeInput = page.getByRole('textbox', { name: 'Country code' });
        this.saveDeviceButton = page.getByRole('button', { name: 'Save' });
    }

    private async fillDeviceForm(name: string, os: string, code: string): Promise<string> {
        const deviceName = `${name} ${Math.floor(Math.random() * 1000)}`;
        await this.nameInput.fill(deviceName);
        await this.osTypeInput.click();
        await this.page.getByRole('listitem').filter({ hasText: os }).click();
        await this.countryCodeInput.fill(code);
        await this.saveDeviceButton.click();
        return deviceName;
    }

    async createDevice1(): Promise<string> {
        return this.fillDeviceForm('Test device 1', 'iPhone', '01701');
    }

    async createDevice2(): Promise<string> {
        return this.fillDeviceForm('Test device 2', 'Android', '01507');
    }
}