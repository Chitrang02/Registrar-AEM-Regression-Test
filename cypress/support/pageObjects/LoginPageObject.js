export class LoginPageObject {

    gotoLoginPage() {
        cy.visit(Cypress.env('url'));
    }

    login(username, password) {
        cy.get('input[name="userid"]').clear().type(username);
        cy.get('input[name="password"]').clear().type(password);
        cy.get('form').contains('button[type="submit"]', 'Login').should('be.visible').click();
    }

    ExistingUserLogin() {
        cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.timeout(10000);
            return cy.get('h6.txt_blue.mb-2.fs-14')
        });
    }

    NewUserLogin() {
        cy.origin('https://aem-dev.registrarcorp.com', () => {
            return cy.url({ timeout: 10000 })
        });
    }
}