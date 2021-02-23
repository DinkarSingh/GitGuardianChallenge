import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';
import { OptionFinder } from '../../../infra/utilities/optionFinder'

export class PermeterPage extends BasePage {

    public constructor(parentElement) {
        super(parentElement);
    }

    private get filterRow() { return this.parentElement.$('form ul') }

    private get healthFilter() {
        return this.filterRow.$$('li');
    }

    private get healthClearButotn() {
        return this.filterRow.$$('button');
    }

    private get tableRow() {
        return this.parentElement.$('[role="table"]  [role="rowgroup"]  [role="row"]');
    }

    private get tableColumn() {
        return this.tableRow.$$('[role="cell"]');
    }

    public getPerimeterTitleText(): string {
        waitUntil(() => this.parentElement.$('.cache-1ais8p3 .cache-1mprejs').isExisting(), Timeouts.FORTY_SECONDS, 'Title was not displaying');
        return this.parentElement.$('.cache-1ais8p3 .cache-1mprejs').getText().trim();
    }

    public isHealthOptionSelected(numberOfOrg: string): boolean {
        const ssss = this.healthFilter[2].$('[role = "combobox"] button div div');
        waitUntil(() => this.healthFilter[2].$('[role = "combobox"] button div div').isExisting(), Timeouts.FORTY_SECONDS, 'Health option was not displaying');
        const healthValue = this.healthFilter[2].$('[role = "combobox"] button div div').getText().trim();
        if (healthValue === numberOfOrg) {
            return true;
        }
    }

    public clickOnFilterClearButton() {
        waitUntil(() => this.healthClearButotn.isExisting(), Timeouts.FORTY_SECONDS, 'Clear button was not displaying');
        this.healthClearButotn.click();
    }

    public isSourceExistingDisplaying(): boolean {
        return waitUntil(() => this.tableColumn[1].$('.cache-8uhtka a').isExisting(), Timeouts.FORTY_SECONDS, 'Source name was not displaying');
    }

    public getHealthColumnText(): string {
        waitUntil(() => this.tableColumn[2].$('.cache-p38jk0 span span').isExisting(), Timeouts.FORTY_SECONDS, 'Health of source was not displaying');
        return this.tableColumn[2].$('.cache-p38jk0 span span').getText().trim();
    }

}
