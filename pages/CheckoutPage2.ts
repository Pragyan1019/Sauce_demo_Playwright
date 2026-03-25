import {Page,Locator} from "@playwright/test";

export class CheckOutPage2{
    page:Page;
    checkout_page_title:Locator;
    container:Locator;
    inventory_item:Locator;
    inventory_quantity:Locator;
    inventory_item_name:Locator;
    inventory_item_desc:Locator;
    inventory_item_price:Locator;
    shipping_label:Locator;
    shipping_value:Locator;
    price_label:Locator;
    sub_total_label:Locator;
    tax_label:Locator;
    total_label:Locator;
    cancelBtn:Locator;
    finishBtn:Locator;
    constructor(page:Page){
        this.page = page;
        this.checkout_page_title = page.locator('[data-test="title"]');
        this.container = page.locator('[data-test="checkout-summary-container"]');

        //items locators
        this.inventory_item = page.locator('[data-test="inventory-item"]')
        this.inventory_quantity = page.locator('[data-test="item-quantity"]')
        this.inventory_item_name = page.locator('[data-test="inventory-item-name"]')
        this.inventory_item_desc = page.locator('[data-test="inventory-item-desc"]')
        this.inventory_item_price = page.locator('[data-test="inventory-item-price"]')

        //shipping information locators
        this.shipping_label = page.locator('[data-test="shipping-info-label"]')
        this.shipping_value = page.locator('[data-test="shipping-info-value"]')
        
        //price total locators
        this.price_label = page.locator('[data-test="total-info-label"]');
        this.sub_total_label = page.locator('[data-test="subtotal-label"]');
        this.tax_label = page.locator('[data-test="tax-label"]')
        this.total_label = page.locator('[data-test="total-label"]');

        //buttons locators
        this.cancelBtn = page.locator('[data-test="cancel"]');
        this.finishBtn = page.locator('[data-test="finish"]')
    }
    async clickFinishBtn(){
        await this.finishBtn.click();
    }
    async clickCancelBtn(){
        await this.cancelBtn.click();
    }
    async getInventoryItemName():Promise<string[]>{
        return this.inventory_item_name.allTextContents();
    }
    async getInventoryItemPrice():Promise<string[]>{
        return this.inventory_item_price.allTextContents()
    }
    async getSubTotal():Promise<string[]>{
        return this.sub_total_label.allTextContents();
    }
    async getTax():Promise<string[]>{
        return this.tax_label.allTextContents();
    }
    async getTotalPrice():Promise<string[]>{
        return this.total_label.allTextContents();
    }

}