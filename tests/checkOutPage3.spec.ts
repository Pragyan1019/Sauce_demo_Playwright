import {test,expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/cartPage"
import { CheckoutPage } from "../pages/checkOutPage"
import { CheckOutPage2 } from "../pages/CheckoutPage2"
import { CheckoutPage3 } from "../pages/CheckoutPage3"

test.describe('checkoutPage all tests',()=>{
    let login:LoginPage;
    let inventory:InventoryPage;
    let cart:CartPage;
    let checkout :CheckoutPage;
    let ckout :CheckOutPage2;
    let ckfinal : CheckoutPage3;
    test.beforeEach('Login,Inventory,Cart pages work here',async({page})=>{
        login = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        checkout = new CheckoutPage(page);
        ckout = new CheckOutPage2(page);
        ckfinal = new CheckoutPage3(page);
        await login.gotopage();
        await login.logintopage('standard_user','secret_sauce');
        await inventory.addToCart("Sauce Labs Backpack");
        await inventory.addToCart("Sauce Labs Onesie");
        await inventory.shopping_cart_btn.click();
        await cart.checkoutBtn();
        await checkout.checkoutFormFill('Pragyan','Ghimire','4335');
        await checkout.continueButton();
        await ckout.clickFinishBtn();
    })
    test('page visibility @smoke',async({page})=>{
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(ckfinal.checkout_container).toBeVisible();
        await expect(ckfinal.checkout_header).toBeVisible();
    })
    test('back home button @regrssion',async({page})=>{
        await ckfinal.clickbackBtn();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }) 

})