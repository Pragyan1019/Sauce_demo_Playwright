# Documentation

## Project-overview

-An end-to-end test automation suite for saucedemo.com using Playwright and TypeScript and adhering to Page Object Model design patterns.
The test automation suite includes test cases for login, inventory, cart, checkout, and logout using data-driven and tagged test execution.

## Tools Used

-Playwright : test automation framework
-Node js : Runtime Environment
-Page Object Model : Design pattern

## Structure

saucedemo-automation/
├── pages/ — Page Object classes
│ ├── LoginPage.ts
│ ├── InventoryPage.ts
│ ├── cartPage.ts
│ ├── checkoutPage.ts
│ ├── CheckoutPage2.ts
│ ├── CheckoutPage3.ts
├── tests/ — Spec files containing test cases
│ ├── loginPage.spec.ts
│ ├── inventoryPage.spec.ts
│ ├── cartPage.spec.ts
│ ├── checkoutPage.spec.ts
│ ├── checkoutPage2.spec.ts
│ ├── checkoutPage3.spec.ts
├── playwright.config.ts — Global configuration
└── package.json

## test coverage

spec file test case tags
-loginPage.spec.ts : valid login check and redirect to inventory @critical @smoke
-loginPage.spec.ts : empty username and shows error message @negative
-loginPage.spec.ts : invalid login check and shows error message @negative
-inventoryPage.spec.ts : tested navbar(Menu button) @smoke
-inventoryPage.spec.ts : checked add to cart buttons @smoke
-inventoryPage.spec.ts : checked logout funtion and redirected to login page @smoke
-inventoryPage.spec.ts : page loads with 6 products @critical @smoke
-inventoryPage.spec.ts : add item updates cart badge @critical
-inventoryPage.spec.ts : sorting the products @regeression
-cartPage.spec.ts : verified added products @regeression
-CheckoutPage.spec.ts : valid data fills and redirects to checkout2 @critical
-CheckoutPage.spec.ts : invalid data fills @critical
-CheckoutPage2.spec.ts : page contains valid added products with correct desc @critical@smoke

## How to run:

1. Clone the repository
   git clone <your-repo-url>

2. Install dependencies
   npm install

3. Install Playwright browsers
   npx playwright install

4. Run all tests
   npx playwright test

5. Run by tag
   npx playwright test --grep @smoke
   npx playwright test --grep @critical
   npx playwright test --grep @regression

6. View HTML report
   npx playwright show-report

## Other Details:

### Page Object Model

— Chose POM to separate the locators and actions from the test logic.
If the locator changes, we don’t have to change all the test files.

### Data-driven testing with forEach

— Chose to use forEach instead of writing individual tests to keep the test logic in one place.
If we want to add a new scenario, we just have to add one entry in the data array.

### Tags

— Tests are tagged with @critical, @smoke, @regression, @negative.
This allows us to execute the tests in different environments.
Smoke tests are executed on every build, regression tests are executed nightly.

### beforeEach for login

— Login is the precondition for all the tests that are executed after login.
By using beforeEach, we don’t have to repeat the login code in all the tests.

## Limitations:

- No API testing is required as there is no API in saucedemo
- No cross-browser configuration is set up
- No CI/CD is implemented
- The test is dependent on saucedemo running; there is no mocking
