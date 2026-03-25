import {Page,Locator} from '@playwright/test';

export class LoginPage{
    page:Page;
    username:Locator;
    password:Locator;
    loginbtn:Locator;
    errormessage:Locator;
    constructor(page:Page){
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.loginbtn = page.getByRole('button',{name:'Login'});
        this.errormessage = page.locator('[data-test="error"]')
    }
    async gotopage(){
        await this.page.goto('https://www.saucedemo.com/');
    }
    async logintopage(User_name:string,Pass_word:string){
        await this.username.fill(User_name);
        await this.password.fill(Pass_word);
        await this.loginbtn.click();
    
    }
}