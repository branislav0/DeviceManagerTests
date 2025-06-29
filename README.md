
# 🎭Playwright E2E Tests🎭 – Device Management App

This project contains end-to-end (E2E) automated UI tests written using [Playwright](https://playwright.dev) for a web-based device management application.

## Overview

This project contains automated UI tests for the Device Management application.

## 🧪Tested Application

The tests target the Device Management application deployed at:  
[https://homework-fe.fly.dev/](https://homework-fe.fly.dev/)

## 🧪 Overview of Test Coverage

All user stories have been tested as separate specs:

### ✅ Story 1 – Login and Logout
- Valid admin login
- Blocked login with invalid credentials or missing input
- Logout removes access to `/devices` route

### ✅ Story 2 – Device Creation
- Device can be created and is visible in the list
- Device with empty fields can't be submitted (Save remains visible)

### ✅ Story 3 – Device Sorting
- Devices can be sorted by:
  - Device name
  - Country
  - Created date
  - OS type

### ✅ Story 4 – Device Deletion
- Devices can be selected and deleted from the list

### ✅ Happy Path (Full Flow)
- Logs in, creates device, verifies it's visible, deletes it

---

## 📂 Project Structure
tests/  
├── specs/  All test specs organized by user story  
│ ├── login.spec.ts  
│ ├── createDevice.spec.ts  
│ ├── deleteDevice.spec.ts  
│ ├── deviceList.spec.ts  
│ └── happyPath.spec.ts  
│  
├── pages/  Page Object Model (POM)  
│ ├── loginPage.ts  
│ ├── homePage.ts  
│ └── createDevicePage.ts  
│  
├── helpers/ Test utilities and shared logic  
│ └── testHelpers.ts  
│  
├── assets/ Screenshots of story files to test (PNG files)  
│ └── userStories1.pdf  
│ └── userStories2.png  
│
└──README.md  This documentation file

## ⚙️ Tech Stack

-   **Playwright🎭**
    
-   **TypeScript**
    
-   **Page Object Model (POM) architecture**
- **Before each function**
-  **Helper file**
- **Chromium browser**



## 🔒 Notes

-   This suite assumes a clean test state – devices are deleted before each test when needed.
    
-   No mocking: tests run against real app behavior.
    
-   Network requests are partially observed for form validation.
- Only three POMs were used intentionally since the last test runs on the homepage, so a fourth POM was not needed.
    

----------

Playwright🎭

