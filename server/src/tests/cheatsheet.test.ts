import express from 'express';
import supertest from 'supertest';
import routes from '../routes';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { Cheatsheet } from '../entity/Cheatsheet';
import { CheatsheetCategory } from '../entity/CheatsheetCategory';
import { Keybind } from '../entity/Keybind';

const app = express();
app.use(express.json());
app.use('/', routes);

beforeEach(() => {
  return createConnection({
    name: 'default',
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: ['src/entity/**/*.ts'],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

test('store vscode and fetch it', async () => {
  await getRepository(Cheatsheet).insert({
    name: 'vscode',
    logoUrl: 'assets/images/vscodo-logo.png',
  });
  let vscode = await getRepository(Cheatsheet).find({
    where: {
      id: 1,
    },
  });
  expect(vscode[0].name).toBe('vscode');
});

test('GET /sheet', async () => {
  await getRepository(Cheatsheet).insert([
    { name: 'vscode', logoUrl: 'assets/images/vscodo-logo.png' },
    { name: 'photoshop', logoUrl: 'assets/images/photoshop-logo.png' },
  ]);

  await supertest(app)
    .get('/sheet')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(2);
      expect(response.body[1].logoUrl).toEqual(
        'assets/images/photoshop-logo.png'
      );
    });
});

test('GET /sheet/:id', async () => {
  const cheatsheet = new Cheatsheet();
  cheatsheet.name = 'vscode';

  const keybind = new Keybind();
  keybind.name = 'Alt + P';
  keybind.keyCombination = 'Alt + P';
  keybind.description = 'Show Something';
  keybind.likes = 0;

  const category = new CheatsheetCategory();
  category.name = 'Basic';
  category.keybinds = [keybind];
  category.index = 0;

  cheatsheet.keybinds = [keybind];

  await getConnection().manager.save(keybind);
  await getConnection().manager.save(category);
  await getConnection().manager.save(cheatsheet);

  await supertest(app)
    .get('/sheet/1')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);
      expect(response.body[0].name).toEqual('Alt + P');
    });
});
