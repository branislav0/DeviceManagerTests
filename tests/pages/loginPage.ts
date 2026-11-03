import { Locator, Page } from '@playwright/test';
import { existsSync, readFileSync } from 'fs';

const CREDENTIALS_FILE = 'tests/data/credentials.json';

function loadCredentials(): { username: string; password: string } {
    if (!existsSync(CREDENTIALS_FILE)) {
        throw new Error(
            `Missing ${CREDENTIALS_FILE} – copy tests/data/credentials.example.json to it and fill in the test account`
        );
    }
    return JSON.parse(readFileSync(CREDENTIALS_FILE, 'utf-8'));
}

const { username, password } = loadCredentials();

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
