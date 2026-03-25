import {test,expect} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/cartPage";

test.describe('Cartpage test',()=>{
    let login:LoginPage;
    let inventory:InventoryPage;
    let cart:CartPage;
    let addedItemsNames:string[];
    let addItemsPrice:string[];
    test.beforeEach('Login and add item to cart',async({page})=>{
        login = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        await login.gotopage();
        await login.logintopage("standard_user", "secret_sauce");  
        await inventory.addToCart("Sauce Labs Backpack");
        await inventory.addToCart("Sauce Labs Onesie");
        addedItemsNames = ['Sauce Labs Backpack','Sauce Labs Onesie'].sort();
        addItemsPrice = ['$29.99','$7.99'].sort();
        await inventory.goToCart();  
    })
    test('items visibility @smoke',async({page})=>{
        await expect(cart.cart_page_title).toBeVisible();
        await expect(cart.cart_quantity).toBeVisible();
        await expect(cart.inventory_item).toBeVisible();
    })
    test('checkoutButton test @regression',async({page})=>{
        await expect(cart.checkout_btn).toBeVisible();
        await cart.checkoutBtn();    
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await page.getByRole('button',{name:"cancel"}).click();
    })
    test('continue button test @regression',async({page})=>{
        await expect(cart.continue_shopping_btn).toBeVisible();
        await cart.continueFunction();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    test('inventory items test @critical',async({page})=>{
        const cartInventoryItemsNames = (await cart.getProductsName()).sort();
        const cartInventoryItemsPrices = (await cart.getProductPrice()).sort();
        expect(cartInventoryItemsNames).toEqual(addedItemsNames);
        expect(cartInventoryItemsPrices).toEqual(addItemsPrice)
    })
    test('remove from cart @critical',async({page})=>{
        await cart.removeFromCart('Sauce Labs Backpack');
        expect(await cart.getProductsName()).not.toContain('Sauce Labs Backpack');
        
    })
})