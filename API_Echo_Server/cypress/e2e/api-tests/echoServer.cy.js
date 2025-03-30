// Suite de pruebas para ejercicio 2 API Test

describe('Pruebas API Echo Server GET', () => {
    const URL = 'https://echo-serv.tbxnet.com/v1/qa/test1';
    const HEADERS = { accept: 'application/json' };

    it('Test:1 Debe obtener una respuesta válida de la URL', () => {
        cy.request({
            method: 'GET',
            url: URL,
            headers: HEADERS,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.duration).to.be.lessThan(3000);
        });
    });


    it('Test:2 Debe retornar error 404 si la URL no es válida', () => {
        cy.request({
            method: 'GET',
            url: URL + '/novalido-error',
            failOnStatusCode: false,
            headers: HEADERS,
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Test:3   La respuesta de la URL debe ser menor a 3 segundos', () => {
        cy.request({
            method: 'GET',
            url: URL,
            headers: HEADERS,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(3000);
        });
    });

    it('Test:4 La respuesta debe tener la estructura esperada', () => {
        cy.request({
            method: 'GET',
            url: URL,
            headers: HEADERS,
        }).then((response) => {
            expect(response.body).to.be.an('object');

            expect(response.body).to.have.property('ok').and.to.be.a('boolean');
            expect(response.body).to.have.property('date').and.to.be.a('string');

            const expectedDate = new Date().toISOString();

            cy.log('Fecha Esperada:', expectedDate);
        });
    });


});

describe('Pruebas API Echo Server POST', () => {
    const URL = 'https://echo-serv.tbxnet.com/v1';
    const HEADERS = { accept: 'application/json' };
    
    it('Test:1 Debe retornar un status code 500 cuando errorCode es 500', () => {
        cy.request({
            method: 'POST',
            url: `${URL}/echo?text=Test%20Post&randomawait=2&wait=3&errorCode=500`,
            headers: HEADERS,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(500);
            cy.log('Response Body:', JSON.stringify(response.body));
        });
    });

    it('Test:2 Debe contener el mensaje "Internal Server Error" en caso de error 500 en el cuerpo de la respuesta', () => {
        cy.request({
            method: 'POST',
            url: `${URL}/echo?text=Test%20Post&randomawait=2&wait=3&errorCode=500`,
            headers: HEADERS,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.body).to.eq('Internal Server Error');
        });
    });


    it('Test:3 Debe retornar código 200 cuando se pasa un valor en el parámetro "text"', () => {
        cy.request({
            method: 'POST',
            url: `${URL}/echo?text=Test%20Post&randomawait=2&wait=3`,
            headers: HEADERS,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('text').and.to.be.a('string');
            expect(response.body.text).to.eq('Test Post');
        });
    });

    it('Test:4 Debe retornar error code 400 si no se incluye el parámetro obligatorio "text"', () => {
        cy.request({
          method: 'POST',
          url: `${URL}/echo?randomawait=2&wait=3`,
          headers: HEADERS,
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(400);
      
          expect(response.body).to.have.property('message').and.to.be.a('string');
          expect(response.body.message).to.include('Bad Request');
        });
    });

    it('Test:5 El tiempo de respuesta debe ser menor a 3 segundos', () => {
        cy.request({
            method: 'POST',
            url: `${URL}/echo?text=Test%20Post&randomawait=2&wait=3`,
            headers: HEADERS,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(3000);
        });
    });

    it('Test:6 Debe retornar 200 cuando no se incluyen parámetros opcionales', () => {
        const textParam = 'Prueba con text'
        cy.request({
          method: 'POST',
          url: `${URL}/echo?text=` + textParam,
          headers: HEADERS,
        }).then((response) => {
          
          expect(response.status).to.eq(200);
      
          expect(response.body).to.have.property('text').and.to.be.a('string');
          expect(response.body.text).to.eq(textParam);

        });
      });
});
