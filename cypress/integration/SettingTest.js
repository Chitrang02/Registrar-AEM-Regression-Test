
import { LoginPageObject } from "../support/pageObjects/LoginPageObject";
import { SettingPageObject } from "../support/pageObjects/SettingPageObject";

describe('Setting Tab Tests', function () {
    const loginPage = new LoginPageObject();
    const settingPage = new SettingPageObject();
    beforeEach(function () {

        cy.fixture('Login').then(function (data) {
            this.data = data;

            loginPage.gotoLoginPage(this.data.url);
            loginPage.login(this.data.username_Existing, this.data.password_Existing);
        });
    })

    it('Verify Settings Tab is Accessible', function () {

        settingPage.clickOnSettingTab().should('include', '/settings');

    });

    it('Verify Company Name is Mandatory', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyNameMandatory().should('equal', 'Please enter Company Name');;

    });

    it('Verify Company Name can be edited and saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyNameEditAndSave().then((data) => {
            cy.log('We typed:', data.typed);
            cy.log('We found:', data.found);
            expect(data.found).to.equal(data.typed);
        });
    });

    it('Verify Email Address Section is Mandatory', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyEmailMandatory().should('equal', 'Please enter Email');

    });

    it('Verify Email Address can be edited and saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyEmailEditAndSave().then((data) => {
            cy.log('We typed:', data.typed);
            cy.log('We found:', data.found);
            expect(data.found).to.equal(data.typed);
        });


    });

    it('Verify New Email Address field can be added and add second email address', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyEmailAddAndSave().then((data) => {
            cy.log('We typed:', data.typed);
            cy.log('We found:', data.found);
            expect(data.found).to.equal(data.typed);
        })

    });

    it('Verify Added Email Address can be removed', function () {

        settingPage.clickOnSettingTab()
        settingPage.removeAddedEmail().should('eq', 1);

    });

    it('Verify Brand Name can be Edit and saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.brandNameEditAndSave().then((data) => {
            cy.log('We typed:', data.typed);
            cy.log('We found:', data.found);
            expect(data.found).to.equal(data.typed);
        });
    });

    it('Verify Brand New Brand Name Can be added and Saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.brandNameAddAndSave().then((data) => {
            cy.log('We typed:', data.typed);
            cy.log('We found:', data.found);
            expect(data.found).to.equal(data.typed);
        });
    })

    it('Verify User can remove the Brand Name', function () {

        settingPage.clickOnSettingTab()
        settingPage.removeAddedBrandName().then((count) => {
            expect(count.after).to.equal(count.before - 1);
        });
    })

    it('Verify that user can upload the website logo successfully', function () {

        settingPage.clickOnSettingTab()
        settingPage.upload_Website_Logo().should('contain', 'You have updated profile details successfully.');

    })

    it('Verify that user can upload the AEM Portal logo successfully', function () {

        settingPage.clickOnSettingTab()
        settingPage.upload_AEMProtal_Logo().should('contain', 'You have updated profile details successfully.');

    })

    it('Verify that user can upload Product Listing file successfully', function () {

        settingPage.clickOnSettingTab()
        settingPage.upload_ProductListing_File().should('', '');
    })

});
