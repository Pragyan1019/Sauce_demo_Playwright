import {test,expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/cartPage"
import { CheckoutPage } from "../pages/checkOutPage"


type checkoutdata ={
    Fname:string,
    Lname:string,
    Pcode :string,
    errormessage:string
};
const invalidData: checkoutdata[] =[
    {Fname:'',Lname:'ghimire',Pcode:'4335',errormessage:'Error: First Name is required'},
    {Fname:'Pragyan',Lname:'',Pcode:'4335',errormessage:'Error: Last Name is required'},
    {Fname:'Pragyan',Lname:'ghimire',Pcode:'',errormessage:'Error: Postal Code is required'},
    {Fname:'Pragyan',Lname:'ghimire',Pcode:'4335',errormessage:''},
]

test.describe('checkoutPage all tests',()=>{
    let login:LoginPage;
    let inventory:InventoryPage;
    let cart:CartPage;
    let checkout :CheckoutPage;
    test.beforeEach('Login,Inventory,Cart pages work here',async({page})=>{
        login = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        checkout = new CheckoutPage(page);
        await login.gotopage();
        await login.logintopage('standard_user','secret_sauce');
        await inventory.addToCart("Sauce Labs Backpack");
        await inventory.addToCart("Sauce Labs Onesie");
        await inventory.shopping_cart_btn.click();
        await cart.checkoutBtn();
    })
    test('visibility of form',async()=>{
        await expect(checkout.checkout_page_title).toBeVisible();
        expect(checkout.checkout_page_title).toHaveText('Checkout: Your Information')
        await expect(checkout.checkout_info_form).toBeVisible();
    })
    invalidData.forEach(({Fname,Lname,Pcode,errormessage})=>{
        test(`checkoutPage form fill check ${Fname || 'null'} ${Lname || 'null'}${ Pcode || 'null'} @critical`,async({page})=>{
            await checkout.checkoutFormFill(Fname,Lname,Pcode);
            await checkout.continueButton();
            if(errormessage =='' || errormessage == null){
                await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
            }
            else{
                await expect(checkout.errormessage_area).toContainText(errormessage)
            }
        })

    })

})