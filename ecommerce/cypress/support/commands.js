import { faker } from '@faker-js/faker';

Cypress.Commands.add('register', (userName = faker.person.fullName(), email = faker.internet.email()) => {
  const password = faker.internet.password({ length: 10, memorable: true });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const company = faker.company.name();
  const address = faker.location.streetAddress();
  const country = 'United States';
  const state = faker.location.state();
  const city = faker.location.city();
  const zipcode = faker.location.zipCode();
  const mobileNumber = faker.phone.number('##########');

  cy.get('a[href="/login"]').click();
  cy.contains('New User Signup!').should('be.visible');

  cy.get('input[name="name"]').type(userName);
  cy.get('input[data-qa="signup-email"]').type(email);
  cy.get('button[data-qa="signup-button"]').click();

  cy.get('body').then(($body) => {
    if ($body.text().includes('Email Address already exist!')) {
      cy.log('El email ya está registrado. Prueba con otro email.');
    } else if ($body.text().includes('Invalid email format')) {
      cy.log('Formato de email inválido.');
    } else {
      cy.log('No se detectaron errores visibles en el formulario.');
    }
  });

  cy.contains('Enter Account Information').should('be.visible');


  cy.get('input#id_gender2').check();
  cy.get('input[name="password"]').type(password);
  cy.get('select#days').select(faker.number.int({ min: 1, max: 30 }).toString());
  cy.get('select#months').select(faker.date.month());
  cy.get('select#years').select(faker.number.int({ min: 1950, max: 2005 }).toString());

  cy.get('input[name="first_name"]').type(firstName);
  cy.get('input[name="last_name"]').type(lastName);
  cy.get('input[name="company"]').type(company);
  cy.get('input[name="address1"]').type(address);
  cy.get('select[data-qa="country"]').select(country);
  cy.get('input[name="state"]').type(state);
  cy.get('input[name="city"]').type(city);
  cy.get('input[name="zipcode"]').type(zipcode);
  cy.get('input[name="mobile_number"]').type(mobileNumber);
  cy.get('button[data-qa="create-account"]').click();

  cy.contains('Account Created!').should('be.visible');
  cy.get('a[data-qa="continue-button"]').click();

  cy.contains(`Logged in as ${userName}`).should('be.visible');
  cy.wait(3000);
  cy.contains('Logout').should('be.visible').click();

});

Cypress.Commands.add('login', (email, password) => {
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();
  cy.wait(3000);
});
