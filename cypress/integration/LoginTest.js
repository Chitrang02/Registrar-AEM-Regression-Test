import { LoginPageObject } from '../support/pageObjects/LoginPageObject';

describe('AEM Mocra Login', function () {
    const loginPage = new LoginPageObject();

    beforeEach(function () {
        cy.fixture('Login').then(function (data) {
            this.data = data;
            loginPage.gotoLoginPage();
        })
    });

    it('Existing Login user and verifies redirect', function () {

        loginPage.login(this.data.username_Existing, this.data.password_Existing);
        loginPage.ExistingUserLogin().should('contain', '*Please Note: These listings are filed with FDA');

    });

    it('New Login user and Verify redirect to Setting Tab', function () {

        loginPage.login(this.data.username_New, this.data.password_New);
        loginPage.NewUserLogin().should('include', '/settings');

    });
    
});