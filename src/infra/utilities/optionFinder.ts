import { Timeouts } from '../enum/timeouts';
import { waitUntil } from '../../infra/waiter/wait';
import { BasePage } from '../../pages/GitGuadianPages/base-Page';


export class OptionFinder extends BasePage {

    public constructor(parentElement) {
        super(parentElement);
    }

    public getTextSearch(text: string) {
        const elements = this.parentElement;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    public getDropdownOptionText(text) {
        const elements = this.parentElement;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getAttribute('data-cy');
            const options = itemByTexts.includes(text);
            return options;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

}