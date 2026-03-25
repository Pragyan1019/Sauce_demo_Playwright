import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  page: Page;
  title: Locator;
  inventory_list: Locator;
  open_menu: Locator;
  all_items_sidebar: Locator;
  sidebar:Locator;
  about_sidebar: Locator;
  logout_sidebar: Locator;
  reset_sidebar: Locator;
  close_btn_sidebar: Locator;
  inventory_container: Locator;
  inventory_item: Locator;
  shopping_cart_btn: Locator;
  shopping_cart_badge: Locator;
  item_title: Locator;
  item_desc: Locator;
  item_price: Locator;
  product_sort_container: Locator;
  // add_to_cart_btn:Locator;
  // remove_from_cart_btn:Locator;
  f_twitter: Locator;
  f_facebook: Locator;
  f_linkedin: Locator;
  f_text: Locator;
  productName: string = "";
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.open_menu = page.getByRole("button", { name: "Open Menu" });
    this.sidebar = page.locator('div').filter({ hasText: /^All ItemsAboutLogoutReset App State$/ });
    this.all_items_sidebar = page.locator(
      '[data-test="inventory-sidebar-link"]',
    );
    this.about_sidebar = page.locator('[data-test="about-sidebar-link"]');
    this.logout_sidebar = page.locator('[data-test="logout-sidebar-link"]');
    this.reset_sidebar = page.locator('[data-test="reset-sidebar-link"]');
    this.close_btn_sidebar = page.getByRole('button',{name:'Close Menu'});
    this.inventory_container = page.locator(
      '[data-test="inventory-container"]',
    );
    this.inventory_list = page.locator('[data-test="inventory-list"]');
    this.inventory_item = page.locator('[data-test="inventory-item"]');
    this.shopping_cart_btn = page.locator('[data-test="shopping-cart-link"]');
    this.shopping_cart_badge = page.locator(
      '[data-test="shopping-cart-badge"]',
    );
    this.item_title = page.locator('[data-test="inventory-item-name"]');
    this.item_desc = page.locator('[data-test="inventory-item-desc"]');
    this.item_price = page.locator('[data-test="inventory-item-price"]');
    // this.add_to_cart_btn = page.locator(`[data-test="add-to-cart-${this.productName}"]`)
    // this.remove_from_cart_btn = page.locator(`[data-test="remove-${this.productName}"]`)
    this.product_sort_container = page.locator(
      '[data-test="product-sort-container"]',
    );
    this.f_twitter = page.locator('[data-test="social-twitter"]');
    this.f_facebook = page.locator('[data-test="social-facebook"]');
    this.f_linkedin = page.locator('[data-test="social-linkedin"]');
    this.f_text = page.locator('[data-test="footer-copy"]');
  }
  async addToCart(productName: string) {
    this.productName = productName.toLowerCase().replace(/\s/g, "-");
    await this.page.locator(`[data-test="add-to-cart-${this.productName}"]`).click();
  }
  async removeFromCart(productName: string) {
    this.productName = productName.toLowerCase().replace(/\s/g, "-");
    await this.page.locator(`[data-test="remove-${this.productName}"]`).click();
  }
  async openMenu() {
    await this.open_menu.click();
  }
  
  async closeMenu() {
    await this.close_btn_sidebar.click();
  }
  async sortContainer(value: "az" | "za" | "lohi" | "hilo") {
    await this.product_sort_container.selectOption(value);
  }
  async goToCart() {
    await this.shopping_cart_btn.click();
  }
  async logOut() {
    await this.logout_sidebar.click();
  }
  async resetAppState() {
    await this.reset_sidebar.click();
  }
  async getProductsCount(): Promise<number> {
    return await this.inventory_item.count();
  }
  async getProductNames(): Promise<string[]> {
    return await this.item_title.allTextContents();
  }
  async getProductPrices(): Promise<string[]>{
    return await this.item_price.allTextContents();
  }
}
