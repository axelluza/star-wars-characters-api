const AWS = require('aws-sdk');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.createCharacter = async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuidv4(),
      nombre: data.nombre,
      altura: data.altura,
      peso: data.peso,
      color_cabello: data.color_cabello,
      color_piel: data.color_piel,
      año_nacimiento: data.año_nacimiento,
      genero: data.genero,
      mundo_origen: {
        nombre: data.mundo_origen.nombre,
        clima: data.mundo_origen.clima,
        terreno: data.mundo_origen.terreno,
        poblacion: data.mundo_origen.poblacion
      },
      peliculas: data.peliculas,
      especies: data.especies,
      vehiculos: data.vehiculos,
      naves_estelares: data.naves_estelares,
      creado: new Date(),
      editado: new Date(),
      url: data.url
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al crear el personaje' }),
    };
  }
};


module.exports.getOrFetchCharacters = async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
  };

  try {
    const result = await dynamoDb.scan(params).promise();

    if (result.Items.length === 0) {
      const response = await axios.get('https://swapi.py4e.com/api/people/');
      const characters = response.data.results;

      for (const character of characters) {
        const planetResponse = await axios.get(character.homeworld);
        const planetData = planetResponse.data;

        const putParams = {
          TableName: process.env.TABLE_NAME,
          Item: {
            id: uuidv4(),
            nombre: character.name,
            altura: character.height,
            peso: character.mass,
            color_cabello: character.hair_color,
            color_piel: character.skin_color,
            año_nacimiento: character.birth_year,
            genero: character.gender,
            mundo_origen: {
              nombre: planetData.name,
              clima: planetData.climate,
              terreno: planetData.terrain,
              poblacion: planetData.population,
            },
            peliculas: character.films,
            especies: character.species,
            vehiculos: character.vehicles,
            naves_estelares: character.starships,
            creado: character.created,
            editado: character.edited,
            url: character.url
          }
        };

        console.log("Almacenando personaje:", putParams.Item.nombre);
        await dynamoDb.put(putParams).promise();
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Personajes almacenados desde la API correctamente', characters }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error al obtener o almacenar personajes:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener o almacenar personajes' }),
    };
  }
};

module.exports.getCharacterById = async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Personaje no encontrado' }),
      };
    }
  } catch (error) {
    console.log(error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener el personaje' }),
    };
  }
};

module.exports.editCharacter = async (event) => {
  const data = JSON.parse(event.body);
  const characterId = event.pathParameters.id;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: characterId,
    },
    UpdateExpression: "set #n = :n, #a = :a, #p = :p, #cc = :cc, #cp = :cp, #an = :an, #g = :g, #mo = :mo, #pel = :pel, #esp = :esp, #veh = :veh, #ne = :ne, #url = :url, #ed = :ed",
    ExpressionAttributeNames: {
      "#n": "nombre",
      "#a": "altura",
      "#p": "peso",
      "#cc": "color_cabello",
      "#cp": "color_piel",
      "#an": "año_nacimiento",
      "#g": "genero",
      "#mo": "mundo_origen",
      "#pel": "peliculas",
      "#esp": "especies",
      "#veh": "vehiculos",
      "#ne": "naves_estelares",
      "#ed": "editado",
      "#url": "url" 
    },
    ExpressionAttributeValues: {
      ":n": data.nombre,
      ":a": data.altura,
      ":p": data.peso,
      ":cc": data.color_cabello,
      ":cp": data.color_piel,
      ":an": data.año_nacimiento,
      ":g": data.genero,
      ":mo": {
        nombre: data.mundo_origen.nombre,
        clima: data.mundo_origen.clima,
        terreno: data.mundo_origen.terreno,
        poblacion: data.mundo_origen.poblacion
      },
      ":pel": data.peliculas,
      ":esp": data.especies,
      ":veh": data.vehiculos,
      ":ne": data.naves_estelares,
      ":url": data.url,
      ":ed": new Date().toISOString()
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al editar el personaje' }),
    };
  }
};


module.exports.deleteCharacter = async (event) => {
  const characterId = event.pathParameters.id;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: characterId,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 204,
      body: JSON.stringify({ message: 'Personaje eliminado correctamente' }),
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al eliminar el personaje' }),
    };
  }
};

module.exports.getSwaggerDoc = async () => {
  const swaggerDoc = fs.readFileSync(path.join(__dirname, 'swagger.yaml'), 'utf8');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/yaml',
    },
    body: swaggerDoc,
  };
};

module.exports.getSwaggerUI = async () => {
  const swaggerUIHtml = fs.readFileSync(path.join(__dirname, 'swagger-ui.html'), 'utf8');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: swaggerUIHtml,
  };
};

