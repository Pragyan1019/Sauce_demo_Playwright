import {Page,Locator} from "@playwright/test";

export class CartPage{
    page:Page;
    cart_page_title:Locator;
    cart_quantity:Locator;
    cart_desc:Locator;
    continue_shopping_btn:Locator;
    checkout_btn:Locator;
    inventory_item:Locator;
    item_title:Locator;
    item_desc:Locator;
    item_price:Locator;

    productName:string;
    constructor(page:Page){
        this.page = page;
        this.cart_page_title = page.locator('[data-test="title"]')
        this.cart_quantity = page.locator('[data-test="cart-quantity-label"]')
        this.cart_desc = page.locator('[data-test = "cart-desc-label"]')
        this.continue_shopping_btn = page.locator('[data-test = "continue-shopping"]')
        this.checkout_btn = page.locator('[data-test = "checkout"]')

        //inventory item 
        this.inventory_item = page.locator('[data-test="cart-contents-container"]')
        //added-cart-contents
        this.item_title = page.locator('[data-test="inventory-item-name"]')
        this.item_desc = page.locator('[data-test= "inventory-item-desc"]')
        this.item_price = page.locator('[data-test = "inventory-item-price"]')
        this.productName = '';
    }
    async continueFunction(){
        await this.continue_shopping_btn.click();
    }
    async checkoutBtn(){
        await this.checkout_btn.click();
    }
    async getProductsName():Promise<string[]>{
        return this.item_title.allTextContents();
    }
    async getProductPrice():Promise<string[]>{
        return this.item_price.allTextContents();
    }
    async removeFromCart(productName:string){
        this.productName = productName.toLowerCase().replace(/\s/g, "-");
        await this.page.locator(`[data-test="remove-${this.productName}"]`).click();
    }
}