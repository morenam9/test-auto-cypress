// Suite de pruebas para ejercicio 1 Ecommerce

describe('SingUp y Login', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com/');
  });

  context('Test:1 - Registro de un Nuevo Usuario', () => {
    it('Debe registrar un nuevo usuario', () => {
      cy.register();
    });

    it('Test:2 Debe mostrar un mensaje de error si el email ya está registrado', () => {  
      cy.get('a[href="/login"]').click();
      cy.get('input[name="name"]').type('Morena Machado');
      cy.get('input[data-qa="signup-email"]').type('machadomorena29@gmail.com');     // Mail que registré previamente para que se genere mensaje de error.
      cy.get('button[data-qa="signup-button"]').click();
  
      cy.contains('Email Address already exist!').should('be.visible');
    });
   
  });

  context('Test:3 - Login', () => {
    it('Inicio de sesión con credenciales válidas', () => {
      cy.contains('Home').should('be.visible');

      cy.get('a[href="/login"]').click();
      cy.contains('Login to your account').should('be.visible');

      cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    });

    it('Test:4 Debe mostrar un error al ingresar credenciales inválidas', () => {
      cy.contains('Home').should('be.visible');

      cy.get('a[href="/login"]').click();
      cy.contains('Login to your account').should('be.visible'); 

      cy.login('homerosimpsons@gmail.com', 'MmmRosquillas');

      cy.contains('Your email or password is incorrect!').should('be.visible');
      cy.wait(3000);
    });
  });

});
  