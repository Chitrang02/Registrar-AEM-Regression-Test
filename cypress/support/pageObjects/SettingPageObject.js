export class SettingPageObject {

    clickOnSettingTab() {
        cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.wait(10000);
            cy.get('a.nav-item.nav-link[href="/settings"]').should('contain', 'Settings').click();
            return cy.url();
        });
    };

    companyNameMandatory() {
        cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.get('input[type="text"][placeholder="Company Name"]').should('be.visible').clear();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait(2000);
            return cy.get('div.app-container .profileSetting-block .col-12.col-md-10 span.fs-14.text-danger');

        })
    }

    companyNameEditAndSave() {
        cy.intercept('POST', '**/aers-setting*').as('update');

        cy.origin('https://aem-dev.registrarcorp.com', () => {

            const uniqueCompanyName = 'Yellow Dolphin' + Date.now();

            cy.get('input[type="text"][placeholder="Company Name"]')
                .clear()
                .type(uniqueCompanyName);
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@update').its('response.statusCode').should('eq', 200);
            return cy.get('.offcanvas-body-media .company-username span.px-2.px-2');
        })
    }

    companyEmailMandatory() {
        cy.origin('https://aem-dev.registrarcorp.com', () => {

            cy.get('div.email-Address-Section input[type="email"]:nth-child(1)').clear();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            return cy.get('div.email-Address-Section span.fs-14.text-danger');
        })
    }

    companyEmailEditAndSave() {
        cy.intercept('POST', '**/aers-setting*', (req) => {
            // Modify body to match (remove DATA key if present)
            if (req.body.DATA) {
                req.body.COMPANY_NAME = req.body.DATA.COMPANY_NAME;
                delete req.body.DATA;
            }
        }).as('updateEmail');

        cy.origin('https://aem-dev.registrarcorp.com', () => {

            const uniqueEmail = 'user' + Date.now() + '@example.com';

            cy.get('div.email-Address-Section input[type="email"]:nth-child(1)').clear().type(uniqueEmail);
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@updateEmail').its('response.statusCode').should('eq', 200);
            return cy.get('div.email-Address-Section input[type="email"]:nth-child(1)');
        })
    }

    companyEmailAddAndSave() {
        cy.intercept('POST', '**/aers-setting*').as('updateEmail');

        cy.origin('https://aem-dev.registrarcorp.com', () => {


            const uniqueEmail = 'user' + Date.now() + '@example.com';
            cy.wait(2000);

            cy.get('button[aria-label="add more"]').first().click();
            cy.get('div.email-Address-Section input[type="email"]').its('length').should('be.to', 2);
            cy.get('div.email-Address-Section input[type="email"]').eq(1).clear().type(uniqueEmail).blur();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@updateEmail').its('response.statusCode').should('eq', 200);
            return cy.get('div.email-Address-Section input[type="email"]');

        })
    }

    removeAddedEmail() {
        cy.intercept('POST', '**/aers-setting*', (req) => {
            // Modify body to match (remove DATA key if present)
            if (req.body.DATA) {
                req.body.COMPANY_NAME = req.body.DATA.COMPANY_NAME;
                delete req.body.DATA;
            }
        }).as('deleteEmail');


        cy.origin('https://aem-dev.registrarcorp.com', () => {


            cy.get('div.emailAddress_block span.fs-14.fw-normal.lh-sm.txt_blue').click();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@deleteEmail').its('response.statusCode').should('eq', 200);
            return cy.get('div.email-Address-Section input[type="email"]');

        })
    }

    brandNameEditAndSave() {
        cy.intercept('POST', '**/aers-setting*', (req) => {
            // Modify body to match (remove DATA key if present)
            if (req.body.DATA) {
                req.body.COMPANY_NAME = req.body.DATA.COMPANY_NAME;
                delete req.body.DATA;
            }
        }).as('updateBrand');

        cy.origin('https://aem-dev.registrarcorp.com', () => {

            const uniqueBrandName = 'Brand ' + Math.random().toString(36).substring(7);

            cy.get('div input[placeholder="Add your brand name here"][type="text"]').first().clear().type(uniqueBrandName).blur();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@updateBrand').its('response.statusCode').should('be.oneOf', [200, 201]);
            return cy.get('div input[placeholder="Add your brand name here"][type="text"]');
        })
    }

    brandNameAddAndSave() {
        cy.intercept('POST', '**/aers-setting*', (req) => {
            // Modify body to match (remove DATA key if present)
            if (req.body.DATA) {
                req.body.COMPANY_NAME = req.body.DATA.COMPANY_NAME;
                delete req.body.DATA;
            }
        }).as('newBrand');

        cy.origin('https://aem-dev.registrarcorp.com', () => {
            const uniqueBrandName = 'Brand ' + Math.random().toString(36).substring(7);

            cy.wait(2000);
            cy.get('button[aria-label="add more"]').eq(1).click();
            cy.get('input.align-items-center.email-input[placeholder="Add your brand name here"][type="text"]').last().clear()
                .type(uniqueBrandName).blur();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@newBrand').its('response.statusCode').should('be.oneOf', [200, 201]);
            return cy.get('input.align-items-center.email-input[placeholder="Add your brand name here"][type="text"]');
        });
    }

    removeAddedBrandName() {
        cy.intercept('POST', '**/aers-setting*', (req) => {
            // Modify body to match (remove DATA key if present)
            if (req.body.DATA) {
                req.body.COMPANY_NAME = req.body.DATA.COMPANY_NAME;
                delete req.body.DATA;
            }
        }).as('removeBrand');

        cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.wait(2000);
            cy.get('div.brandSection_block span.fs-14.fw-normal.lh-sm.txt_blue').last().click();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@removeBrand').its('response.statusCode').should('be.oneOf', [200, 201]);
            return cy.get('input.align-items-center.email-input[placeholder="Add your brand name here"][type="text"]');
        })
    }
};