import { Locator, Page } from '@playwright/test';
import { readFileSync } from 'fs';

const { username, password } = JSON.parse(
    readFileSync('tests/data/credentials.json', 'utf-8')
);

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

    async gotoLoginPage() {
        await this.page.goto('https://homework-fe.fly.dev/');
    }

    async loginCorrectCredentials() {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}