const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout: 6000,


  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    specPattern: 'cypress/integration/**/*.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

      experimentalOriginDependencies: true
    },
  },

  env: {

    url: "https://dev.myfda.com"
  },

});
