import { expect } from 'chai';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { LoginPage } from '../../../src/pages/GitGuadianPages/loginPage/login.page';
import { projConfig } from '../../../src/infra/resources/projConfig';

let loginPage = new LoginPage();
let logger: TestLogger;
let testIndex = 0;


describe('GitGuardian login page test cases', () => {

    before(() => {
        logger = new TestLogger();
        browser.url('/');
    });

    beforeEach(() => {
        testIndex++;
        browser.url('/');
    });

    it('Verify that invalide email has error pop up displaying', () => {
        TestBuildingBlocks.addStepAndExecute(`Verify that login page displaying`, () => {
            expect(loginPage.isLoginButtonExistingDisplaying()).to.eq(true, 'Login page was not displaying');
            loginPage.clickOnPopUpValidation();
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the invalide user email id as ${projConfig.invalideEmail} in the textbox`, () => {
            loginPage.enterUserIdInTextbox(projConfig.invalideEmail)
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the user passwordin the textbox`, () => {
            loginPage.enterUserPasswordInTextbox(projConfig.password)
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Login button on login page`, () => {
            loginPage.SelectLoginButton();
            expect(loginPage.isErrorMessageExistingDisplaying()).to.eq(true, 'Error message pop-up was not displaying');
        });
    });


    it('Verify that invalide password has error pop up displaying', () => {
        TestBuildingBlocks.addStepAndExecute(`Verify that login page displaying`, () => {
            expect(loginPage.isLoginButtonExistingDisplaying()).to.eq(true, 'Login page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the valide user email id as ${projConfig.emailId} in the textbox`, () => {
            loginPage.enterUserIdInTextbox(projConfig.emailId)
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the invalide user email id as ${projConfig.invalidePassword} in the textbox`, () => {
            loginPage.enterUserPasswordInTextbox(projConfig.invalidePassword)
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Login button on login page`, () => {
            loginPage.SelectLoginButton();
            expect(loginPage.isErrorMessageExistingDisplaying()).to.eq(true, 'Error message pop-up was not displaying');
        });
    });

    it('Verify that invalide email and invalide password has error pop up displaying', () => {
        TestBuildingBlocks.addStepAndExecute(`Verify that login page displaying`, () => {
            expect(loginPage.isLoginButtonExistingDisplaying()).to.eq(true, 'Login page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the invalide user email id as ${projConfig.invalideEmail} in the textbox`, () => {
            loginPage.enterUserIdInTextbox(projConfig.invalideEmail)
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the invalide user email id as ${projConfig.invalidePassword} in the textbox`, () => {
            loginPage.enterUserPasswordInTextbox(projConfig.invalidePassword)
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Login button`, () => {
            loginPage.SelectLoginButton();
            expect(loginPage.isErrorMessageExistingDisplaying()).to.eq(true, 'Error message pop-up was not displaying');
        });
    });

    it('Verify that successfull login for user', () => {
        TestBuildingBlocks.addStepAndExecute(`Verify that login page displaying`, () => {
            expect(loginPage.isLoginButtonExistingDisplaying()).to.eq(true, 'Login page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the user email as ${projConfig.emailId} in the textbox`, () => {
            loginPage.enterUserIdInTextbox(projConfig.emailId)
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the user password as ${projConfig.password} in the textbox`, () => {
            loginPage.enterUserPasswordInTextbox(projConfig.password)
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Login button`, () => {
            const homepage = loginPage.clickOnLoginInButton();
            expect(homepage.isUserEmailIdExistingDisplaying()).to.eq(true, 'Home page was not displaying');
            expect(homepage.loggedUserEmailtext()).to.eq(projConfig.emailId, `User is not logged as ${projConfig.emailId}`);
        });
    });


    /*it('Verify that successfull user can logout', () => {
        TestBuildingBlocks.addStepAndExecute(`Verify that login page displaying`, () => {
            expect(loginPage.isLoginButtonExistingDisplaying()).to.eq(true, 'Login page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the user email as ${projConfig.emailId} in the textbox`, () => {
            loginPage.enterUserIdInTextbox(projConfig.emailId)
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the user password as ${projConfig.password} in the textbox`, () => {
            loginPage.enterUserPasswordInTextbox(projConfig.password)
        });
        const homepage = loginPage.clickOnLoginInButton();
        TestBuildingBlocks.addStepAndExecute(`Click on Login button`, () => {
            expect(homepage.isUserEmailIdExistingDisplaying()).to.eq(true, 'Home page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Check user email is displaying in logout panel`, () => {
            expect(homepage.loggedUserEmailtext()).to.eq(projConfig.emailId, `User is not logged as ${projConfig.emailId}`);
        });
        const logoutPanel = homepage.clickToOpenLogoutPanel();
        TestBuildingBlocks.addStepAndExecute(`Click on user email in logout panel and check outout panel is displaying`, () => {
            expect(logoutPanel.isLogoutButtonExistingDisplaying()).to.eq(true, `Logout button was not found`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on logout button`, () => {
            logoutPanel.clickOnLogoutButton();
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that login page displaying`, () => {
            expect(loginPage.isLoginButtonExistingDisplaying()).to.eq(true, 'Login page was not displaying');
            loginPage.clickOnPopUpValidation();
        });
    });*/
});
