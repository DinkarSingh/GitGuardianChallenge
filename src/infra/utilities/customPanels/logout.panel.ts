import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../../../pages/GitGuadianPages/base-Page';
import { OptionFinder } from '../../../infra/utilities/optionFinder'

export class LogoutPanel extends BasePage {

    public constructor(parentElement) {
        super(parentElement);
    }

    private get logoutButton() {
        return this.parentElement.$('button');
    }

    public isLogoutButtonExistingDisplaying(): boolean {
        return waitUntil(() => this.logoutButton.isExisting(), Timeouts.FORTY_SECONDS, 'Logout button was not displaying');
    }

    public clickOnLogoutButton() {
        waitUntil(() => this.logoutButton.isExisting(), Timeouts.FORTY_SECONDS, 'Logout button was not displaying');
        this.logoutButton.click();
    }
}