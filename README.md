# Star Wars Characters API

  

Esta es una API para gestionar personajes del universo de Star Wars, implementada con AWS Lambda y DynamoDB. Permite crear, editar, obtener y eliminar personajes utilizando la API de Star Wars (SWAPI).

  

## Endpoints

  

-  **POST /characters Crear personaje**: Permite añadir nuevos personajes a la base de datos.

-  **PUT /characters/{id} Editar personaje**: Actualiza la información de un personaje existente.

-  **GET /characters Obtener personajes**: Recupera todos los personajes de la base de datos.

-  **GET /characters/{id} Obtener un personaje**: Recupera un personaje por ID de la base de datos.

-  **DELETE /characters/{id} Eliminar personaje**: Elimina un personaje de la base de datos.

  

## Tecnologías utilizadas

  

- [Node.js](https://nodejs.org/) - Entorno de ejecución JavaScript.

- [AWS Lambda](https://aws.amazon.com/lambda/) - Computación sin servidor.

- [DynamoDB](https://aws.amazon.com/dynamodb/) - Base de datos NoSQL de AWS.

- [Axios](https://axios-http.com/) - Cliente HTTP para hacer solicitudes a la API de Star Wars.

  

## Requisitos

  

- Node.js v12 o superior.

- Una cuenta de AWS con permisos para usar Lambda y DynamoDB.

- AWS CLI configurado

- Serverless Framework instalado globalmente (`npm install -g serverless`)

  

## Instalación

  

1. Clona el repositorio:

  

```bash
git clone https://github.com/axelluza/star-wars-characters-api.git
cd star-wars-characters-api
 ```

2. Instala las dependencias:  

```bash
npm install
 ```
3. Instala las dependencias:

Configura las variables de entorno en el archivo serverless.yml:

  

En el archivo serverless.yml, las variables de entorno, como el nombre de la tabla de DynamoDB y la región de AWS, ya están configuradas en la sección environment. Asegúrate de que estos valores sean correctos para tu entorno.

  

```yaml
environment:
TABLE_NAME: StarWarsCharactersTable
```  

## Ejecucion

  

Ejecución local

Para ejecutar la API localmente usando el plugin serverless-offline:

  

```bash
serverless  offline
```
  

Ejecución  de  pruebas

Para  ejecutar  las  pruebas,  usa: 

```bash
npm test
```
  

Despliega la API:

  

```bash
serverless  deploy
```
  

## Ejecucion

La  documentación  de  la  API  está  disponible  en  formato  Swagger:

- [Swagger UI](https://jfp1uu7ny1.execute-api.us-east-1.amazonaws.com/dev/swagger-ui.html)

- [Swagger YAML](https://jfp1uu7ny1.execute-api.us-east-1.amazonaws.com/dev/swagger.yaml)

  

## Licencia

Este  proyecto  está  licenciado  bajo  la  Licencia  MIT.