# Proyecto de Pruebas Automatizadas con Cypress

Este repositorio contiene pruebas automatizadas implementadas con Cypress para probar la UI de la aplicación web https://automationexercise.com/ y pruebas de API con Echo Server https://echo-serv.tbxnet.com/explorer/#/QA/get_qa_test1.

## Clonar el Repositorio

Para clonar el repositorio, usá el siguiente comando en la terminal:

```bash
git clone https://github.com/morenam9/test-auto-cypress.git

```
## Instalación de Dependencias

Navegar a la carpeta del proyecto e instalar las siguientes dependencias con npm:

```bash
cd test-auto-cypress
npm install
npm init 

```

### Dependencia para la UI

Para las pruebas en la interfaz de usuario (UI), necesitas instalar la siguiente dependencia para la generación de datos ramdon en las pruebas de Registro de un Nuevo usuario:

```bash
npm install @faker-js/faker --save-dev
```

## Ejecución de los Tests

#### Para ejecutar los tests de Cypress en la interfaz de usuario:


Navegá a la carpeta del proyecto \ecommerce y ejecutá los tests de Cypress en la UI:


```bash
npx cypress open

```

#### Para ejecutar los tests en la API:

Navegá a la carpeta del proyecto \API_Echo_Server y ejecutá los tests de Cypress en la API:

```bash
npx cypress open

```


# Resumen de los Tests de UI  

Esta suite de pruebas automatizadas en Cypress valida el proceso de registro y login en un sitio de e-commerce.  

## Registro de Nuevo Usuario  

1. **Registro exitoso de un nuevo usuario**  
   - Verifica que un usuario pueda registrarse correctamente en la plataforma.  

2. **Manejo de error si el email ya está registrado**  
   - Intenta registrar un usuario con un email existente y valida que se muestre un mensaje de error.  

## Inicio de Sesión (Login)  

3. **Inicio de sesión con credenciales válidas**  
   - Prueba que un usuario registrado pueda iniciar sesión correctamente.  

4. **Manejo de error con credenciales inválidas**  
   - Intenta hacer login con credenciales incorrectas y verifica que se muestre un mensaje de error.  

# Resumen de los Tests de API  

Esta suite de pruebas automatizadas en Cypress valida el correcto funcionamiento de las solicitudes **GET** y **POST** en el servidor **Echo Server**.  

## Pruebas API - **GET**  

1. **Obtener una respuesta válida de la URL**  
   - Verifica que la API responda correctamente con un código de estado **200**.  

2. **Manejo de error 404 cuando la URL no es válida**  
   - Envía una solicitud a una URL incorrecta y valida que el estado de respuesta sea **404**.  

3. **Tiempo de respuesta menor a 3 segundos**  
   - Confirma que la API responde en menos de **3 segundos** para garantizar un buen rendimiento.  

4. **Validación de estructura de respuesta**  
   - Comprueba que la respuesta tenga el formato esperado, incluyendo las propiedades `ok` (booleano) y `date` (string).  

##  Pruebas API - **POST**  

5. **Error 500 cuando `errorCode=500`**  
   - Envía una solicitud con un parámetro que fuerza un error del servidor y valida que el estado de respuesta sea **500**.  

6. **Mensaje "Internal Server Error" en caso de error 500**  
   - Verifica que el cuerpo de la respuesta contenga el mensaje adecuado en caso de error.  

7. **Código 200 cuando se proporciona el parámetro `text`**  
   - Comprueba que la API responde correctamente cuando se envía el parámetro obligatorio `text`.  

8. **Error 400 cuando falta el parámetro obligatorio `text`**  
   - Valida que la API devuelva un código **400** cuando no se envía el parámetro necesario.  

9. **Tiempo de respuesta menor a 3 segundos**  
   - Asegura que la API responda en **menos de 3 segundos** para solicitudes **POST**.  

10. **Código 200 cuando no se incluyen parámetros opcionales**  
   - Verifica que la API funcione correctamente aún sin parámetros opcionales, siempre que `text` esté presente.  


