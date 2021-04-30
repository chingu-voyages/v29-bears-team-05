import { createConnection, getConnection, getRepository } from 'typeorm';
import { Cheatsheet } from '../entity/Cheatsheet';

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
