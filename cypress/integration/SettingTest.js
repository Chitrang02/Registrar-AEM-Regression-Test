
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

        settingPage.clickOnSettingTab()
        settingPage.clickOnSettingTab().should('include', '/settings');

    });

    it('Verify Company Name is Mandatory', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyNameMandatory().should('have.text', 'Please enter Company Name');;

    });

    it('Verify Company Name can be edited and saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyNameEditAndSave().should('have.text', uniqueCompanyName);

    });

    it('Verify Email Address Section is Mandatory', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyEmailMandatory().should('have.text', 'Please enter Email');

    });

    it('Verify Email Address can be edited and saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyEmailEditAndSave().should('have.value', uniqueEmail);

    });

    it('Verify New Email Address field can be added and add second email address', function () {

        settingPage.clickOnSettingTab()
        settingPage.companyEmailAddAndSave().eq(1).should('have.value', uniqueEmail);

    });

    it('Verify Added Email Address can be removed', function () {

        settingPage.clickOnSettingTab()
        settingPage.removeAddedEmail().its('length').should('eq', 1);

    });

    it('Verify Brand Name can be Edit and saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.brandNameEditAndSave().first().should('have.value', uniqueBrandName);

    });

    it('Verify Brand New Brand Name Can be added and Saved', function () {

        settingPage.clickOnSettingTab()
        settingPage.brandNameAddAndSave().last().should('have.value', uniqueBrandName);
    })

    it('Verify User can remove the Brand Name', function () {

        settingPage.clickOnSettingTab()
        settingPage.removeAddedBrandName().last().should('have.value', uniqueBrandName);
    })

    it.only('Verify that user can upload the website logo successfully', function () {
        settingPage.clickOnSettingTab()
        cy.intercept('POST', '**/aers-setting*').as('uploadLogo');
 const filePath = 'images/logo.jpg';

        cy.origin('https://aem-dev.registrarcorp.com',{args: { filePath }}, ({filePath}) => {
           
            cy.get('#WebLogo').selectFile(filePath, { force: true });
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@uploadLogo').its('response.statusCode').should('eq', 200);
            cy.get('div.Toastify').should('be.visible').and('contain', 'successfully');

        });
    })

});
