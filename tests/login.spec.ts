import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type LoginData = {
  username: string;
  password: string;
  errorMessage: string;
};
const invalidData: LoginData[] = [
  {
    username: "",
    password: "secret_sauce",
    errorMessage: "Username is required",
  },
  {
    username: "standard_user",
    password: "",
    errorMessage: "Password is required",
  },
  {
    username: "invaliduser",
    password: "secret_sauce",
    errorMessage:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    username: "standard_user",
    password: "invalidpassword",
    errorMessage:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    username: "",
    password: "",
    errorMessage: "Username is required",
  },
];

test.describe("Login test @critical", () => {
  let login: LoginPage;
  test.beforeEach("goto website", async ({ page }) => {
    login = new LoginPage(page);
    await login.gotopage();
  });

  test("valid Login_check @smoke", async ({ page }) => {
    await login.logintopage("standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator('[data-test="title"]')).toBeVisible();
  });

  invalidData.forEach(({username,password,errorMessage})=>{
    test(`Invalid Login_check "${username || 'empty'}" /"${password || 'empty'}" @negative`,async({page})=>{
        await login.logintopage(username,password);
        await expect(login.errormessage).toBeVisible();
        await expect(login.errormessage).toContainText(errorMessage);
    })
  })

});
