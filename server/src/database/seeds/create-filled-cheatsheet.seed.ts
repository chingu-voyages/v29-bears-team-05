import { Cheatsheet } from '../../entity/Cheatsheet';
import { CheatsheetCategory } from '../../entity/CheatsheetCategory';
import { Keybind } from '../../entity/Keybind';
import { Factory, Seeder } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Connection } from 'typeorm';

export class CreateFilledCheatsheet implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const cheatsheet = await factory(Cheatsheet)().create();
    const categories = await factory(CheatsheetCategory)().createMany(8);
    categories.forEach((category, index) => (category.index = index));
    const keybinds = await factory(Keybind)()
      .map(async (keybind) => {
        keybind.cheatsheet = cheatsheet;
        keybind.cheatsheetCategory = Faker.random.arrayElement(categories);
        return keybind;
      })
      .createMany(20);

    cheatsheet.keybinds = keybinds;

    await connection.manager.save(cheatsheet);
    await connection.manager.save(categories);
    await connection.manager.save(keybinds);
  }
}
