import {Page,Locator} from "@playwright/test";

export class CheckoutPage{
    page:Page;
    checkout_page_title : Locator;
    checkout_info_form : Locator;
    checkout_Fname : Locator;
    checkout_Lname : Locator;
    postal_code : Locator;
    errormessage_area:Locator;
    cancelBtn : Locator;
    continueBtn : Locator;
    constructor(page:Page){
        this.page = page;
        this.checkout_page_title = page.locator('[data-test="title"]');
        this.checkout_info_form = page.locator('.checkout_info');
        
        //checkout form
        this.checkout_Fname = page.locator('[data-test="firstName"]');
        this.checkout_Lname = page.locator('[data-test="lastName"]');
        this.postal_code = page.locator('[data-test="postalCode"]');
        this.errormessage_area = page.locator('[data-test="error"]')
        //buttons
        this.cancelBtn = page.locator('[data-test="locator"]');
        this.continueBtn = page.locator('[data-test="continue"]');
    }

    async cancelButton(){
        await this.cancelBtn.click();
    }
    async checkoutFormFill(fname:string,lname:string,code:string){
        await this.checkout_Fname.click();
        await this.checkout_Fname.fill(fname);
        await this.checkout_Lname.click();
        await this.checkout_Lname.fill(lname);
        await this.postal_code.click();
        await this.postal_code.fill(code);
    }
    async continueButton(){
        await this.continueBtn.click();
    }
}