import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../../../pages/GitGuadianPages/base-Page';
import { OptionFinder } from '../../../infra/utilities/optionFinder'
import { IncidentsPage } from '../../../pages/GitGuadianPages/incidentspage/incidents.page';

export class SecrateIncidentPanel extends BasePage {

    public constructor(parentElement) {
        super(parentElement);
    }

    private get title() {
        return this.parentElement.$$('.cache-7tv6qt a');
    }

    private get incidentStatus() {
        return this.parentElement.$('.cache-utzn58 .chakra-stack .cache-15wh7je span');
    }

    public isSecretIncidentIdExisting(): boolean {
        return waitUntil(() => this.title[1].isExisting(), Timeouts.FORTY_SECONDS, 'Secrate incident ID was not displaying');
    }

    public goToIncidentMenu() {
        waitUntil(() => this.title[0].isExisting(), Timeouts.FORTY_SECONDS, 'Secrate incident title was not displaying');
        this.title[0].click();
    }

    public isIncidentStatusExisting(): boolean {
        return waitUntil(() => this.incidentStatus.isExisting(), Timeouts.FORTY_SECONDS, 'Incident status was not displaying');
    }

    public getIncidentStatustext(): string {
        waitUntil(() => this.incidentStatus.isExisting(), Timeouts.FORTY_SECONDS, 'Incident status was not displaying');
        return this.incidentStatus.getText().trim();
    }

    public selectAssigneeName() {
        waitUntil(() => this.parentElement.$('[role = "combobox"] .cache-79elbk').isExisting(), Timeouts.FORTY_SECONDS, 'Incident status was not displaying');
        this.parentElement.$('[role = "combobox"] .cache-79elbk').click();
        const options = $('#root [role = "listbox"] ul li div p');
        options.click();
    }

    public isAssigneeNameSelectedDisplaying(): string {
        waitUntil(() => this.parentElement.$('[role = "combobox"] .cache-79elbk div .cache-oeyump').isExisting(), Timeouts.FORTY_SECONDS, 'Incident status was not displaying');
        return this.parentElement.$('[role = "combobox"] .cache-79elbk div .cache-oeyump').getText().trim();
    }

    public getAssignedStatustext(): string {
        waitUntil(() => $('.chakra-stack .cache-1h8gyx6').isExisting(), Timeouts.FORTY_SECONDS, 'Incident status was not displaying');
        return $('.chakra-stack .cache-1h8gyx6').getText().trim();
    }

    public selectResolveOptions(option: string) {
        browser.pause(2000);
        waitUntil(() => this.parentElement.$$('.chakra-stack [aria-haspopup = "dialog"]')[0].isExisting(), Timeouts.FORTY_SECONDS, 'Resolve dropdown was not displaying');
        this.parentElement.$$('.chakra-stack [aria-haspopup = "dialog"]')[0].doubleClick();
        const elements = this.getMultiOptionalCheck();
        const foundElement = elements.getTextSearch(option);
        foundElement.click();
    }

    public getMultiOptionalCheck(): OptionFinder {
        const options = $$('[role= "dialog"] button');
        return new OptionFinder(options);
    }

    public clickOnReopenButton() {
        waitUntil(() => this.parentElement.$$('.chakra-button span')[2].isExisting(), Timeouts.FORTY_SECONDS, 'Reopen button was not displaying');
        this.parentElement.$$('.chakra-button span')[2].doubleClick();
    }
}