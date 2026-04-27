export class SettingPageObject {

    clickOnSettingTab() {
        return cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.wait(10000);
            cy.get('a.nav-item.nav-link[href="/settings"]').should('contain', 'Settings').click();
            return cy.url();
        });
    };

    companyNameMandatory() {
        return cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.get('input[type="text"][placeholder="Company Name"]').should('be.visible').clear();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait(2000);
            return cy.get('div.app-container .profileSetting-block .col-12.col-md-10 span.fs-14.text-danger').invoke('text');
        })
    }

    companyNameEditAndSave() {

        cy.intercept('POST', '**/aers-setting*').as('update');
        cy.intercept('GET', '**/aers-setting*').as('loadData');
        return cy.origin('https://aem-dev.registrarcorp.com', () => {

            const uniqueCompanyName = 'Yellow Dolphin' + Date.now();

            cy.get('input[type="text"][placeholder="Company Name"]')
                .clear()
                .type(uniqueCompanyName);

            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@update');
            cy.reload();
            cy.wait('@loadData');
            return cy.get('input[type="text"][placeholder="Company Name"]')
                .invoke('val')
                .then((currentValue) => {
                    return {
                        typed: uniqueCompanyName,
                        found: currentValue
                    }
                })

        });

    }
    companyEmailMandatory() {
        return cy.origin('https://aem-dev.registrarcorp.com', () => {

            cy.get('div.email-Address-Section input[type="email"]:nth-child(1)').clear();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            return cy.get('div.email-Address-Section span.fs-14.text-danger').invoke('text');
        });
    }

    companyEmailEditAndSave() {
        cy.intercept('POST', '**/aers-setting*', (req) => {
            // Modify body to match (remove DATA key if present)
            if (req.body.DATA) {
                req.body.COMPANY_NAME = req.body.DATA.COMPANY_NAME;
                delete req.body.DATA;
            }
        }).as('updateEmail');

        cy.intercept('GET', '**/aers-setting*').as('loadData');

        return cy.origin('https://aem-dev.registrarcorp.com', () => {

            const uniqueEmail = 'user' + Date.now() + '@example.com';

            cy.get('div.email-Address-Section input[type="email"]:nth-child(1)').clear().type(uniqueEmail);
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@updateEmail');
            cy.reload();
            cy.wait('@loadData');
            return cy.get('div.email-Address-Section input[type="email"]:nth-child(1)')
                .invoke('val')
                .then((currentValue) => {
                    return {
                        typed: uniqueEmail,
                        found: currentValue
                    }
                });
        })
    }

    companyEmailAddAndSave() {
        cy.intercept('POST', '**/aers-setting*').as('updateEmail');
        cy.intercept('GET', '**/aers-setting*').as('loadData');
        return cy.origin('https://aem-dev.registrarcorp.com', () => {


            const uniqueEmail = 'user' + Date.now() + '@example.com';
            cy.wait(2000);

            cy.get('button[aria-label="add more"]').first().click();
            cy.get('div.email-Address-Section input[type="email"]').its('length').should('be.to', 2);
            cy.get('div.email-Address-Section input[type="email"]').eq(1).clear().type(uniqueEmail).blur();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@updateEmail');
            cy.reload();
            cy.wait('@loadData');
            return cy.get('div.email-Address-Section input[type="email"]').eq(1)
                .invoke('val')
                .then((currentValue) => {
                    return {
                        typed: uniqueEmail,
                        found: currentValue
                    }
                });
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


        return cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.get('div.emailAddress_block span.fs-14.fw-normal.lh-sm.txt_blue').click();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@deleteEmail').its('response.statusCode').should('eq', 200);
            return cy.get('div.email-Address-Section input[type="email"]').its('length');

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
        cy.intercept('GET', '**/aers-setting*').as('loadData');
        return cy.origin('https://aem-dev.registrarcorp.com', () => {

            const uniqueBrandName = 'Brand ' + Math.random().toString(36).substring(7);

            cy.get('div input[placeholder="Add your brand name here"][type="text"]').first().clear().type(uniqueBrandName).blur();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@updateBrand');
            cy.reload();
            cy.wait('@loadData');
            return cy.get('div input[placeholder="Add your brand name here"][type="text"]')
                .invoke('val')
                .then((currentValue) => {
                    return {
                        typed: uniqueBrandName,
                        found: currentValue
                    }
                });
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
        cy.intercept('GET', '**/aers-setting*').as('loadData');
        return cy.origin('https://aem-dev.registrarcorp.com', () => {
            const uniqueBrandName = 'Brand ' + Math.random().toString(36).substring(7);

            cy.wait(2000);
            cy.get('button[aria-label="add more"]').eq(1).click();
            cy.get('input.align-items-center.email-input[placeholder="Add your brand name here"][type="text"]')
                .last()
                .clear()
                .type(uniqueBrandName).blur();
            cy.get('button.save-btn[aria-label="savebtn"]').click();
            cy.wait('@newBrand');
            cy.reload();
            cy.wait('@loadData');
            return cy.get('input.align-items-center.email-input[placeholder="Add your brand name here"][type="text"]')
                .last()
                .invoke('val')
                .then((currentValue) => {
                    return {
                        typed: uniqueBrandName,
                        found: currentValue
                    }
                });
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

        return cy.origin('https://aem-dev.registrarcorp.com', () => {
            cy.wait(2000);
            return cy.get('input.align-items-center.email-input[placeholder="Add your brand name here"][type="text"]')
                .its('length')
                .then((initialLength) => {
                    cy.get('div.brandSection_block span.fs-14.fw-normal.lh-sm.txt_blue').last().click();
                    cy.get('button.save-btn[aria-label="savebtn"]').click();
                    cy.wait('@removeBrand').its('response.statusCode').should('be.oneOf', [200, 201]);
                    return cy.get(
                        'input.align-items-center.email-input[placeholder="Add your brand name here"][type="text"]')
                        .its('length')
                        .then((newLength) => {
                            return { before: initialLength, after: newLength };
                        });
                });
        })
    };

    upload_Website_Logo() {
        cy.intercept('POST', '**/aers-setting*').as('uploadLogo');

        return cy.fixture('images/logo.jpg', 'binary').then(fileContent => {
            return cy.origin('https://aem-dev.registrarcorp.com', { args: { fileContent } }, ({ fileContent }) => {

                cy.get('#WebLogo').selectFile({
                    contents: Cypress.Buffer.from(fileContent, 'binary'),
                    fileName: 'logo.jpg'
                }, { force: true });
                cy.wait(1000); // Wait for the file to be processed
                cy.get('button.save-btn[aria-label="savebtn"]').click();
                cy.wait('@uploadLogo').its('response.statusCode').should('eq', 200);
                return cy.get('div.Toastify').invoke('text').then((toastText) => toastText.trim());

            });

        });
    }

     upload_AEMProtal_Logo() {
        cy.intercept('POST', '**/aers-setting*').as('uploadLogo');

        return cy.fixture('images/logo.jpg', 'binary').then(fileContent => {
            return cy.origin('https://aem-dev.registrarcorp.com', { args: { fileContent } }, ({ fileContent }) => {

                cy.get('#WebLogo').selectFile({
                    contents: Cypress.Buffer.from(fileContent, 'binary'),
                    fileName: 'logo.jpg'
                }, { force: true });
                cy.wait(1000); // Wait for the file to be processed
                cy.get('button.save-btn[aria-label="savebtn"]').click();
                cy.wait('@uploadLogo').its('response.statusCode').should('eq', 200);
                return cy.get('div.Toastify').invoke('text').then((toastText) => toastText.trim());

            });

        });
    }
};