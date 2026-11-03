# 🎭 Playwright E2E Tests – Device Management App

End-to-end (E2E) UI tests written with [Playwright](https://playwright.dev) and TypeScript for a web-based device management application.

## 🧪 Tested application

[https://homework-fe.fly.dev/](https://homework-fe.fly.dev/)

## ✅ Test coverage

All user stories are tested as separate specs (the stories are in `tests/assets/`):

### Story 1 – Login and logout
- Valid admin login
- Blocked login with invalid credentials or missing input
- Logout removes access to the `/devices` route

### Story 2 – Device creation
- Device can be created and is visible in the list
- Device with empty fields can't be submitted (Save remains visible)

### Story 3 – Device sorting
- Devices can be sorted by device name, country, created date and OS type

### Story 4 – Device deletion
- Devices can be selected and deleted from the list

### Happy path (full flow)
- Logs in, creates a device, verifies it's visible, deletes it

## 📂 Project structure

```
tests/
├── tests/                    test specs, one per user story
│   ├── loginPage.spec.ts
│   ├── createDevice.spec.ts
│   ├── deviceList.spec.ts
│   ├── deleteDevice.spec.ts
│   └── happyPath.spec.ts
├── pages/                    Page Object Model (POM)
│   ├── loginPage.ts
│   ├── homePage.ts
│   └── createDevicePage.ts
├── helpers/                  shared test logic
│   └── testHelpers.ts
├── data/
│   └── credentials.example.json   template for the test account
└── assets/                   user stories from the assignment (PDF)
```

## ▶️ How to run

```bash
npm ci
npx playwright install chromium
cp tests/data/credentials.example.json tests/data/credentials.json   # fill in the test account
npm test
```

| Command | What it does |
| --- | --- |
| `npm test` | run all tests (headless Chromium) |
| `npm run test:headed` | run with a visible browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run report` | open the last HTML report |
| `npx playwright test tests/tests/loginPage.spec.ts` | run a single spec |

`tests/data/credentials.json` is git-ignored, so the test account never ends up in the repository.

## ⚙️ Tech stack

- Playwright 🎭 + TypeScript
- Page Object Model (POM) architecture
- `beforeEach` hooks and a shared helper module
- Chromium

## 🔒 Notes

- The suite assumes a clean test state – devices are deleted before each test when needed.
- No mocking: tests run against the real app behaviour.
- Network requests are partially observed for form validation.
- Only three POMs are used on purpose – the last test runs on the home page, so a fourth POM was not needed.
