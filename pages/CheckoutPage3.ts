import {Page,Locator} from "@playwright/test"

export class CheckoutPage3{
    page:Page;
    checkOut_title:Locator;
    checkout_container:Locator;
    checkout_header:Locator;
    checkout_text:Locator;
    back_tO_productsBtn:Locator;
    constructor(page:Page){
        this.page = page;
        this.checkOut_title = page.locator('[data-test="title"]');
        this.checkout_container = page.locator('[data-test="checkout-complete-container"]');
        this.checkout_header = page.locator('[data-test="complete-header"]');
        this.checkout_text = page.locator('[data-test="complete-text"]');
        this.back_tO_productsBtn= page.locator('[data-test="back-to-products"]');
    }
    async clickbackBtn(){
        await this.back_tO_productsBtn.click();
    }
}