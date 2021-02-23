import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';
import { IncidentsPage } from '../incidentspage/incidents.page';

export class LoginPage extends BasePage {
    
    private get popupValidation() { return $$('[role="button"]') }

    private get loginButton() { return $('[type="submit"]') }

    private get loginId() { return $('[data-testid="email"]') }

    private get password() { return $('[data-testid="password"]') }

    private get errorPop() { return $('#root .cache-1sa31mx') }

    /**
     * Click on accept coockies pop up validation button
     */
    public clickOnPopUpValidation() {
        waitUntil(() => this.popupValidation[1].isExisting(), Timeouts.FORTY_SECONDS, 'Coockie pop was not displaying');
        this.popupValidation[1].click()
    }

    public isUserLoggedIn(): boolean {
        const localStorage = browser.getLocalStorage();
        const tokenValus = localStorage[21];
        browser.pause(2000);
        const isUserLoggedIn = localStorage.includes(tokenValus);
        return isUserLoggedIn;
    }

    public login(userEmail: string, userPassword: string) {
        this.enterUserIdInTextbox(userEmail);
        this.enterUserPasswordInTextbox(userPassword);
        this.clickOnLoginInButton();
    }

    /**
     * Check on the login page Login button existing and displaying
     */
    public isLoginButtonExistingDisplaying(): boolean {
        return waitUntil(() => this.loginButton.isExisting(), Timeouts.FORTY_SECONDS, 'Login page was not loaded');
    }

    /**
     * 
     * @param userId 
     * Enter the user Email id in the textbox
     */
    public enterUserIdInTextbox(userId: string) {
        waitUntil(() => this.loginId.isExisting(), Timeouts.FORTY_SECONDS, 'Email textbox was not displaying');
        this.loginId.click()
        this.loginId.setValue(userId);
    }

    /**
     * 
     * @param userPwd 
     * Enter the user password in the textbox
     */
    public enterUserPasswordInTextbox(userPwd: string) {
        waitUntil(() => this.password.isExisting(), Timeouts.FORTY_SECONDS, 'User password textbox was not displaying');
        this.password.click()
        this.password.setValue(userPwd);
    }

    /**
     * here click on login button and home page should be displayed
     */
    public clickOnLoginInButton(): IncidentsPage {
        waitUntil(() => this.loginButton.isExisting(), Timeouts.FORTY_SECONDS, 'Login in button was not displaying');
        this.loginButton.click();
        const homePage = new IncidentsPage();
        waitUntil(() => homePage.isUserEmailIdExistingDisplaying(), Timeouts.TEN_SECONDS, 'Home page is not loaded');
        return homePage;
    }


    public SelectLoginButton() {
        waitUntil(() => this.loginButton.isExisting(), Timeouts.FORTY_SECONDS, 'Login in button was not displaying');
        this.loginButton.click();
    }

    public isErrorMessageExistingDisplaying(): boolean {
        return waitUntil(() => this.errorPop.isExisting(), Timeouts.FORTY_SECONDS, 'Error message pop-up was not displaying');
    }

}