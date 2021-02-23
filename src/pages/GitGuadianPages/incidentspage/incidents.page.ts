import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';
import { OptionFinder } from '../../../infra/utilities/optionFinder'
import { PermeterPage } from '../perimeterPage/permeter.page';
import { LogoutPanel } from '../../../infra/utilities/customPanels/logout.panel';
import { SecrateIncidentPanel } from '../../../infra/utilities/customPanels/secrate.incident.panel';

export class IncidentsPage extends BasePage {

    private get popupValidation() { return $$('[role="button"]') }

    private get userEmail() { return $$('[aria-haspopup="menu"] span div .chakra-text') }

    private get sideMenus() { return $$('#root .cache-1id3akw a p') }

    private get logoutOpener() { 
        return $('#root [aria-haspopup ="menu"] .chakra-avatar div') 
    }

    private get perimeterTab() { return $('#root') }

    private get incidentTitle() { return $$('//*[contains(text(),"Incidents")]') }

    private get filterRow() { return $('#root form ul') }

    private get filterColumn() { return this.filterRow.$$('li') }

    private get table() { return $('#root [role = "table"]') }

    private get tableRow() { return this.table.$('[role = "rowgroup"]') }

    private get tableColumn() { return this.tableRow.$$('[role = "cell"]') }

    public isUserEmailIdExistingDisplaying(): boolean {
        waitUntil(() => this.userEmail[1].isExisting(), Timeouts.FORTY_SECONDS, 'On logout panel user email was not displaying');
        const emailId = this.userEmail[1].getText();
        if (emailId !== null) {
            return true;
        }
    }

    public loggedUserEmailtext(): string {
        waitUntil(() => this.userEmail[1].isExisting(), Timeouts.FORTY_SECONDS, 'On logout panel user email was not displaying');
        return this.userEmail[1].getText().trim();
    }

    public clickToOpenLogoutPanel(): LogoutPanel {
        waitUntil(() => this.logoutOpener.isExisting(), Timeouts.FORTY_SECONDS, 'Logout penel open button was not displaying');
        this.logoutOpener.doubleClick();
        const options = $('#root [data-popper-placement ="bottom-end"]');
        return new LogoutPanel(options);
    }

    public clickOnPopUpValidation() {
        waitUntil(() => this.popupValidation[5].isExisting(), Timeouts.FORTY_SECONDS, 'Coockie pop was not displaying');
        this.popupValidation[5].click()
    }

    public selectSideMenuIcons(iconOption: string) {
        const elements = this.getMultiOptionalCheck();
        const foundElement = elements.getTextSearch(iconOption.toLocaleUpperCase())
        foundElement.click();
    }

    public getMultiOptionalCheck(): OptionFinder {
        const options = this.sideMenus;
        return new OptionFinder(options);
    }

    public gotoPermeterTab(): PermeterPage {
        const permeter = this.perimeterTab;
        return new PermeterPage(permeter);
    }

    public isIncidentTitleExisting(): boolean {
        return waitUntil(() => this.incidentTitle[1].isExisting(), Timeouts.FORTY_SECONDS, 'Title was not displaying');
    }

    public getDateColumnText(): string[] {
        waitUntil(() => this.tableColumn[1].isExisting(), Timeouts.FORTY_SECONDS, 'Date values was not displaying');
        return this.tableColumn[1].$$('p').map((cell) => {
            const date = cell.getText();
            return date;
        });
    }

    public getSecrateColumnText(): string[] {
        waitUntil(() => this.tableColumn[2].isExisting(), Timeouts.FORTY_SECONDS, 'Secrate values was not displaying');
        return this.tableColumn[2].$$('p').map((cell) => {
            return cell.getText();
        });
    }

    public getInfoColumnText(): string[] {
        waitUntil(() => this.tableColumn[3].isExisting(), Timeouts.FORTY_SECONDS, 'Secrate values was not displaying');
        return this.tableColumn[3].$$('p').map((cell) => {
            return cell.getText();
        });
    }

    public getTagsColumnText(): string[] {
        waitUntil(() => this.tableColumn[4].isExisting(), Timeouts.FORTY_SECONDS, 'Secrate values was not displaying');
        return this.tableColumn[4].$$('.cache-t1l4z2 span').map((cell) => {
            return cell.getText();
        });
    }

    public getStatusColumnText(): string{
        waitUntil(() => this.tableColumn[5].$('span span').isExisting(), Timeouts.FORTY_SECONDS, 'Table column status was not displaying');
        return this.tableColumn[5].$('span span').getText().trim();
    }

    public clickOnTriggeredType(): SecrateIncidentPanel{
        waitUntil(() => this.tableColumn[2].$('a').isExisting(), Timeouts.FORTY_SECONDS, 'Table column status was not displaying');
        this.tableColumn[2].$('a').doubleClick();
        const permeter = $('#root .cache-yqy7sz-Wrapper');
        return new SecrateIncidentPanel(permeter);
    }

    public clickOnResetFilter() {
        waitUntil(() => this.filterRow.$('.cache-19svr6s svg').isExisting(), Timeouts.FORTY_SECONDS, 'Reset filter was not displaying');
        this.filterRow.$('.cache-19svr6s svg').click();
    }
}