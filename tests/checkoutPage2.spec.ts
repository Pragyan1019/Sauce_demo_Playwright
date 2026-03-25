import {test,expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/cartPage"
import { CheckoutPage } from "../pages/checkOutPage"
import { CheckOutPage2 } from "../pages/CheckoutPage2"

test.describe('checkoutPage all tests',()=>{
    let login:LoginPage;
    let inventory:InventoryPage;
    let cart:CartPage;
    let checkout :CheckoutPage;
    let ckout :CheckOutPage2;
    let addeditemsName:string[];
    test.beforeEach('Login,Inventory,Cart pages work here',async({page})=>{
        login = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        checkout = new CheckoutPage(page);
        ckout = new CheckOutPage2(page);
        await login.gotopage();
        await login.logintopage('standard_user','secret_sauce');
        await inventory.addToCart("Sauce Labs Backpack");
        await inventory.addToCart("Sauce Labs Onesie");
        const addeditemsName = ['Sauce Labs Backpack','Sauce Labs Onesie'].sort();
        const addeditemsPrice = ['$29.99','$7.99'].sort();
        await inventory.shopping_cart_btn.click();
        await cart.checkoutBtn();
        await checkout.checkoutFormFill('Pragyan','Ghimire','4335');
        await checkout.continueButton();
    })

    test('Visibility test of conatiner @smoke',async()=>{
        await expect(ckout.checkout_page_title).toHaveText('Checkout: Overview')
        await expect(ckout.container).toBeVisible();
    })
    test('cancel button test @smoke',async({page})=>{
        await ckout.clickCancelBtn();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    })
    test('continue button @smoke',async({page})=>{
        await ckout.clickFinishBtn();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    })
    test('correct items added test @critcial',async()=>{
        const itemsName = (await ckout.getInventoryItemName()).sort();
        const itemsPrice = (await ckout.getInventoryItemPrice()).sort();
        expect(itemsName).toEqual(['Sauce Labs Backpack','Sauce Labs Onesie'].sort())
        expect(itemsPrice).toEqual(['$29.99','$7.99'].sort())
    })

})