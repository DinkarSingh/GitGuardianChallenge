import { Timeouts } from '../enum/timeouts';
import { waitUntil } from '../waiter/wait';
import { TestBuildingBlocks } from "./testBuildingBlock";
import { LoginPage } from '../../pages/GitGuadianPages/loginPage/login.page';
import { IncidentsPage } from '../../pages/GitGuadianPages/incidentspage/incidents.page';

export class GitGuardianTestBuildingBlocks extends TestBuildingBlocks {

  /**
   * URL moving to login page
   */
  public navigateToHomePage(): IncidentsPage {
    const homePage: IncidentsPage = new IncidentsPage();
    homePage.navigateToPage();
    const loginPage = new LoginPage();
    if (!loginPage.isUserLoggedIn()) {
      loginPage.login(this.testData.loginDetails.email, this.testData.loginDetails.password);
    } 
    browser.pause(2000);
    waitUntil(() => homePage.isIncidentTitleExisting(), Timeouts.FIVE_SECONDS, 'Home page wasn\'t loaded');
    return new IncidentsPage();
  }

}