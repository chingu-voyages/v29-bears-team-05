import data from './utils/vsCodeMaster.json';
import { createConnection } from 'typeorm';
import { CheatsheetCategory } from './entity/CheatsheetCategory';
import { Cheatsheet } from './entity/Cheatsheet';
import { Keybind } from './entity/Keybind';

type CategoryStore = { [key: string]: CheatsheetCategory };

const init = async () => {
  console.log('Populating data...');
  // create vscode cheatsheet
  const vscode = new Cheatsheet();
  vscode.name = 'vscode';
  vscode.logoUrl = '';
  vscode.keybinds = [];
  // build categories
  const categories: CategoryStore = {};
  data
    .map((x) => x.cheatsheetCategory)
    .filter((x, i, a) => a.indexOf(x) === i)
    .forEach((el, i) => {
      const category = new CheatsheetCategory();
      category.name = el;
      category.index = i;
      category.keybinds = [];
      categories[el] = category;
    });
  // build keybinds
  const keybinds = data.map((x) => {
    const keybind = new Keybind();
    keybind.name = x.name;
    keybind.keyCombination = x.keyCombination;
    keybind.description = x.description;
    keybind.likes = 0;
    //add relations keybind-cheatsheet, keybind-category
    keybind.cheatsheet = vscode;
    keybind.cheatsheetCategory = categories[x.cheatsheetCategory];
    // add relation category-keybind
    categories[x.cheatsheetCategory].keybinds.push(keybind);
    return keybind;
  });
  // add relation cheatsheet-keybinds
  vscode.keybinds = keybinds;

  await createConnection()
    .then(async (conn) => {
      // wipe out any existing data, starting from tables with foreign keys
      await conn.createQueryBuilder().delete().from(Keybind).execute();
      await conn
        .createQueryBuilder()
        .delete()
        .from(CheatsheetCategory)
        .execute();
      await conn.createQueryBuilder().delete().from(Cheatsheet).execute();
      // save to database
      await conn.manager.save(vscode);
      // make categories to an array for connection manager to save easily
      const categoriesOutput = Object.values(categories);
      await conn.manager.save(categoriesOutput);
      await conn.manager.save(keybinds);
      await conn.close();
    })
    .then(() => console.log('Data population complete!'))
    .catch((e) => console.log(e));
};

init();
