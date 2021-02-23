import { expect } from 'chai';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { IncidentsPage } from '../../../src/pages/GitGuadianPages/incidentspage/incidents.page';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { GitGuardianTestBuildingBlocks } from '../../../src/infra/utilities/gitGuardianTestBuildingBlocks';
import { projConfig } from '../../../src/infra/resources/projConfig';
import { IconNamesEnum } from '../../../src/infra/enum/iconNames.enum';

let incidentsPage = new IncidentsPage();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let gitGuardianTestBuildingBlocks = new GitGuardianTestBuildingBlocks(testData);


describe('GitGuardian test cases', () => {

    before(() => {
        logger = new TestLogger();
        testData = new BaseTestData(new LoginDetails(projConfig.emailId, projConfig.password));
        gitGuardianTestBuildingBlocks = new GitGuardianTestBuildingBlocks(testData);
        incidentsPage = gitGuardianTestBuildingBlocks.navigateToHomePage();
        incidentsPage.clickOnPopUpValidation();
    });

    beforeEach(() => {
        testIndex++;
        incidentsPage = gitGuardianTestBuildingBlocks.navigateToHomePage();
    });

    it('Verify that Identify which of your sources are at risk', () => {
        TestBuildingBlocks.addStepAndExecute(`Select the side bar main menu as ${IconNamesEnum.PERIMETER}`, () => {
            incidentsPage.selectSideMenuIcons(IconNamesEnum.PERIMETER);
        });
        const permeterPage = incidentsPage.gotoPermeterTab();
        TestBuildingBlocks.addStepAndExecute(`Verify that ${IconNamesEnum.PERIMETER} title displaying on the top of the page`, () => {
            expect(permeterPage.getPerimeterTitleText()).to.eq(IconNamesEnum.PERIMETER, `${IconNamesEnum.PERIMETER} title was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the health filter is selected with 2 option as At risk and Unknown`, () => {
            const selectedHealthFilter = permeterPage.isHealthOptionSelected('2');
            expect(selectedHealthFilter).to.eq(true, `Health filter was not selected as At risk and Unknown`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that table source name has risks are displaying`, () => {
            const sourceName = permeterPage.isSourceExistingDisplaying();
            expect(sourceName).to.eq(true, `Risk source name was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that Health of source is displaying`, () => {
            const healthStatus = permeterPage.getHealthColumnText();
            expect(healthStatus).to.length.greaterThan(1, `Heath of source was not displaying`);
        });
    });

    it('Verify that triggered incident can be change status as resolved', () => {
        const triggeredstatus = 'Triggered';
        const assigned = 'DINKAR Singh K';
        const resolveOption = 'This is sensitive but I choose not to revoke the secret';
        const assignedStatus = 'Assigned';
        const resolvedStatus = 'Resolved';
        TestBuildingBlocks.addStepAndExecute(`Check Incident tab is displaying`, () => {
            expect(incidentsPage.isIncidentTitleExisting()).to.eq(true, `Incident title was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the date column has value in table`, () => {
            const datesValue = incidentsPage.getDateColumnText();
            expect(datesValue).to.length.greaterThan(1, `Date values column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the secrate has value in table`, () => {
            const secrateValues = incidentsPage.getSecrateColumnText();
            expect(secrateValues).to.length.greaterThan(1, `Secrate value column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the info column has value in table`, () => {
            const infoValues = incidentsPage.getInfoColumnText();
            expect(infoValues).to.length.greaterThan(1, `Info column value column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the tags column has value in table`, () => {
            const infoValues = incidentsPage.getTagsColumnText();
            expect(infoValues).to.length.greaterThan(1, `Tags column value column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the incident status column is triggered`, () => {
            const status = incidentsPage.getStatusColumnText();
            expect(status).to.eq(triggeredstatus.toLocaleUpperCase(), `Status column was empty`);
        });
        const secrateIncidentPanel = incidentsPage.clickOnTriggeredType();
        TestBuildingBlocks.addStepAndExecute(`Select the indicent type from the table column and Check title is displaying`, () => {
            expect(secrateIncidentPanel.isSecretIncidentIdExisting()).to.eq(true, `Secrate incident Id was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the EXPLORE THE INCIDENT panel status is displaying`, () => {
            expect(secrateIncidentPanel.isIncidentStatusExisting()).to.eq(true, `Incident status as ${triggeredstatus} was not displaying`);
            expect(secrateIncidentPanel.getIncidentStatustext()).to.eq(triggeredstatus.toLocaleUpperCase(), `Incident status as ${triggeredstatus} was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the assigned as ${assigned} from the dropdown list`, () => {
            secrateIncidentPanel.selectAssigneeName();
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that status is changed as ${assignedStatus}`, () => {
            const ss = secrateIncidentPanel.getAssignedStatustext();
            expect(secrateIncidentPanel.getAssignedStatustext()).to.eq(assignedStatus.toLocaleUpperCase(), `Status as ${assignedStatus} was not changed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the resolve option as ${resolveOption}`, () => {
            secrateIncidentPanel.selectResolveOptions(resolveOption);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that status is changed as ${resolvedStatus}`, () => {
            expect(secrateIncidentPanel.getAssignedStatustext()).to.eq(resolvedStatus.toLocaleUpperCase(), `Status as ${resolvedStatus} was not changed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on secrate incident move back button`, () => {
            secrateIncidentPanel.goToIncidentMenu();
        });
        TestBuildingBlocks.addStepAndExecute(`Check the incident status column is resolved`, () => {
            incidentsPage.clickOnResetFilter();
            const status = incidentsPage.getStatusColumnText();
            expect(status).to.eq(resolvedStatus.toLocaleUpperCase(), `Status column ${status} was not displaying`);
        });
    });


    it('Verify that resolved incident can be reopen as triggered', () => {
        const triggeredstatus = 'Triggered';
        const assigned = 'DINKAR Singh K';
        const resolvedStatus = 'Resolved';
        TestBuildingBlocks.addStepAndExecute(`Check Incident tab is displaying`, () => {
            expect(incidentsPage.isIncidentTitleExisting()).to.eq(true, `Incident title was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the date column has value in table`, () => {
            incidentsPage.clickOnResetFilter();
            const datesValue = incidentsPage.getDateColumnText();
            expect(datesValue).to.length.greaterThan(1, `Date values column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the secrate has value in table`, () => {
            const secrateValues = incidentsPage.getSecrateColumnText();
            expect(secrateValues).to.length.greaterThan(1, `Secrate value column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the info column has value in table`, () => {
            const infoValues = incidentsPage.getInfoColumnText();
            expect(infoValues).to.length.greaterThan(1, `Info column value column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the tags column has value in table`, () => {
            const infoValues = incidentsPage.getTagsColumnText();
            expect(infoValues).to.length.greaterThan(1, `Tags column value column is empty`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the incident status column is triggered`, () => {
            const status = incidentsPage.getStatusColumnText();
            expect(status).to.eq(resolvedStatus.toLocaleUpperCase(), `Status column was empty`);
        });
        const secrateIncidentPanel = incidentsPage.clickOnTriggeredType();
        TestBuildingBlocks.addStepAndExecute(`Select the indicent type from the table column and Check title is displaying`, () => {
            expect(secrateIncidentPanel.isSecretIncidentIdExisting()).to.eq(true, `Secrate incident Id was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the EXPLORE THE INCIDENT panel status is displaying`, () => {
            expect(secrateIncidentPanel.getAssignedStatustext()).to.eq(resolvedStatus.toLocaleUpperCase(), `Status as ${resolvedStatus} was not changed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on reopen button for incident`, () => {
            secrateIncidentPanel.clickOnReopenButton();
        });
        TestBuildingBlocks.addStepAndExecute(`Select the assigned as ${assigned} from the dropdown list`, () => {
            secrateIncidentPanel.selectAssigneeName();
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that status is changed as ${triggeredstatus}`, () => {
            expect(secrateIncidentPanel.getIncidentStatustext()).to.eq(triggeredstatus.toLocaleUpperCase(), `Incident status as ${triggeredstatus} was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on secrate incident move back button`, () => {
            secrateIncidentPanel.goToIncidentMenu();
        });
        TestBuildingBlocks.addStepAndExecute(`Check the incident status column is triggered`, () => {
            incidentsPage.clickOnResetFilter();
            const status = incidentsPage.getStatusColumnText();
            expect(status).to.eq(triggeredstatus.toLocaleUpperCase(), `Status column ${status} was not displaying`);
        });
    });
});
