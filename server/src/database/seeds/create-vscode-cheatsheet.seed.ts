import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { uniqBy } from 'lodash';
import { Cheatsheet } from '../../entity/Cheatsheet';
import { CheatsheetCategory } from '../../entity/CheatsheetCategory';
import { Keybind } from '../../entity/Keybind';
import vsCodeData from '../../utils/vsCodeMaster.json';

export class CreateVSCheatsheet implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const vsCodeCategories = uniqBy(vsCodeData, 'cheatsheetCategory').map(
      (rec: { cheatsheetCategory: string }) => rec.cheatsheetCategory
    );

    const cheatsheet = await factory(Cheatsheet)({
      name: 'VS Code',
      logoUrl:
        'https://res.cloudinary.com/lonelypandacloud/image/upload/v1620235463/keybound/vs-code_yyee9k.svg',
    }).create();

    for (let index = 0; index < vsCodeCategories.length; index++) {
      const name = vsCodeCategories[index];

      await factory(CheatsheetCategory)({
        name,
        index,
      })
        .map(async (cat: CheatsheetCategory) => {
          const catKeybinds = [];
          const categoryData = vsCodeData.filter(
            (rec) => rec.cheatsheetCategory === cat.name
          );

          for (let index = 0; index < categoryData.length; index++) {
            const kb = categoryData[index];

            const keybind = await factory(Keybind)({
              name: kb.name,
              keyCombination: kb.keyCombination,
              description: kb.description,
              likes: kb.likes,
              cheatsheet,
              cheatsheetCategory: cat,
            }).create();

            cheatsheet.keybinds.push(keybind);
            catKeybinds.push(keybind);
          }

          cat.keybinds = catKeybinds;

          return cat;
        })
        .create();
    }

    await connection.manager.save(cheatsheet);
  }
}
