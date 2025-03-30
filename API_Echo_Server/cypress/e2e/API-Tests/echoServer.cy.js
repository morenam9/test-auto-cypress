// Suite de pruebas para ejercicio 2 API Test

describe('Pruebas API Echo Server', () => {
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

    it('Prueba 3: La respuesta de la URL debe ser menor a 3 segundos', () => {
        cy.request({
            method: 'GET',
            url: URL,
            headers: HEADERS,
        }).then((response) => {
            expect(response.duration).to.be.lessThan(3000);
        });
    });

    it('Prueba 4: La respuesta debe tener la estructura esperada', () => {
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
