import { Locator, Page } from '@playwright/test';
import { readFileSync } from 'fs';

const credentials = JSON.parse(readFileSync('tests/data/credentials.json', 'utf-8'));

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async loginCorrectCredentials() {
        await this.usernameInput.fill(credentials.username);
        await this.passwordInput.fill(credentials.password);
        await this.loginButton.click();
    }

    async gotoLoginPage() {
        await this.page.goto('https://homework-fe.fly.dev/');
    }
}
