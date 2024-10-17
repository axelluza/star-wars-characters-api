const { createCharacter, getOrFetchCharacters, getCharacterById, editCharacter, deleteCharacter } = require('./handler');

describe('Star Wars API Lambda Functions', () => {
  test('createCharacter should create a new character', async () => {
    const event = {
      body: JSON.stringify({
        nombre: 'Luke Skywalker',
        altura: '172',
        peso: '77',
        color_cabello: 'rubio',
        color_piel: 'claro',
        año_nacimiento: '19BBY',
        genero: 'masculino',
        mundo_origen: {
          nombre: 'Tatooine',
          clima: 'árido',
          terreno: 'desierto',
          poblacion: '200000'
        },
        peliculas: [],
        especies: [],
        vehiculos: [],
        naves_estelares: [],
        url: ''
      })
    };
    const result = await createCharacter(event);
    expect(result.statusCode).toBe(201);
  });

  test('getOrFetchCharacters should fetch characters', async () => {
    const result = await getOrFetchCharacters();
    expect(result.statusCode).toBe(200);
  });

  test('getCharacterById should get character by ID', async () => {
    const event = { pathParameters: { id: '1' } };
    const result = await getCharacterById(event);
    expect(result.statusCode).toBe(200);
  });

  test('editCharacter should edit a character', async () => {
    const event = {
      pathParameters: { id: '1' },
      body: JSON.stringify({
        nombre: 'Luke Skywalker',
        altura: '172',
        peso: '77',
        color_cabello: 'rubio',
        color_piel: 'claro',
        año_nacimiento: '19BBY',
        genero: 'masculino',
        mundo_origen: {
          nombre: 'Tatooine',
          clima: 'árido',
          terreno: 'desierto',
          poblacion: '200000'
        },
        peliculas: [],
        especies: [],
        vehiculos: [],
        naves_estelares: [],
        url: ''
      })
    };
    const result = await editCharacter(event);
    expect(result.statusCode).toBe(200);
  });

  test('deleteCharacter should delete a character', async () => {
    const event = { pathParameters: { id: '1' } };
    const result = await deleteCharacter(event);
    expect(result.statusCode).toBe(204);
  });
});
