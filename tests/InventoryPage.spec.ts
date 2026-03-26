import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

const itemsName: string[] = [
  "Sauce Labs Backpack",
//   "Sauce Labs Bike Light",
//   "Sauce Labs Bolt T-shirt",
  "Sauce Labs Fleece Jacket",
  "Sauce Labs Onesie",
//   "Test.allTheThings() T-shirt (Red)",
];

type sortItems = {
  option: "az" | "za" | "lohi" | "hilo";
  label: string;
};
const sortOptions: sortItems[] = [
  { option: "az", label: "From A to Z" },
  { option: "za", label: "From Z to A" },
  { option: "lohi", label: "From low  to high" },
  { option: "hilo", label: "From high to low" },
];

test.describe("Inventory test", () => {
  let login: LoginPage;
  let inventory: InventoryPage;
  test.beforeEach("Login to page ", async ({ page }) => {
    login = new LoginPage(page);
    inventory = new InventoryPage(page);
    await login.gotopage();
    await login.logintopage("standard_user", "secret_sauce");
  });
  test("inventory  count @critical", async () => {
    await expect(inventory.inventory_container).toBeVisible();
    const count = await inventory.getProductsCount();
    expect(count).toBe(6);
  });
  itemsName.forEach((items)=>{
      test(`add to cart function check of item:${items} @critical`,async()=>{
          await inventory.addToCart(items)
          await expect(inventory.shopping_cart_badge).toBeVisible();
          await expect(inventory.shopping_cart_badge).toHaveText('1');
      })
  })
  sortOptions.forEach((option) => {
    test(`sorting using ${option.label}  @regression`, async () => {
      await inventory.sortContainer(option.option);
      const sortedProductNames = await inventory.getProductNames();
      const sortedProductPrices = await inventory.getProductPrices();
      if (option.option == "az") {
        const expectedSortedNames = [...sortedProductNames].sort();
        expect(sortedProductNames).toEqual(expectedSortedNames);
      } else if (option.option == "za") {
        const expectedSortedNames = [...sortedProductNames].sort().reverse();
        expect(sortedProductNames).toEqual(expectedSortedNames);
      } else if (option.option == "hilo") {
        const expectedSortedPrices = [...sortedProductPrices].sort(
          (a, b) => parseFloat(b) - parseFloat(a),
        );
        expect(sortedProductPrices).toEqual(expectedSortedPrices);
      } else if (option.option == "lohi") {
        const expectedSortedPrices = [...sortedProductPrices].sort(
          (a, b) => parseFloat(a) - parseFloat(b),
        );
        expect(sortedProductPrices).toEqual(expectedSortedPrices);
      }
    });
  });
  test.describe("navigation testing ", () => {
    test.beforeEach("opening Menu", async () => {
      await inventory.openMenu();
      await expect(inventory.sidebar).toBeVisible();
    });
    test("navbar all-about @smoke", async ({ page }) => {
        await inventory.all_items_sidebar.click();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await inventory.closeMenu();
    });
    test("navbar about @smoke", async ({ page }) => {
        await inventory.about_sidebar.click();
        await expect(page).toHaveURL("https://saucelabs.com/");
    });
    test("navbar logout @critical", async ({ page }) => {
        await inventory.logout_sidebar.click();
        await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
    test("navbar reset app state @smoke", async ({ page }) => {
        await inventory.addToCart("Sauce Labs Backpack");
        await inventory.addToCart('Sauce Labs Onesie');
        await expect(inventory.shopping_cart_badge).toHaveText('2');
        await inventory.reset_sidebar.click();
        await expect(inventory.shopping_cart_badge).toBeHidden();
        await inventory.closeMenu();

    });
  });
});
