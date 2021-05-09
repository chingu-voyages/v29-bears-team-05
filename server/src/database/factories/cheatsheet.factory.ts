import * as Faker from 'faker';
import { Cheatsheet } from '../../entity/Cheatsheet';
import { define } from 'typeorm-seeding';

define(Cheatsheet, (
  faker: typeof Faker,
  context: Partial<Cheatsheet> | undefined
) => {
  const cheatsheet = new Cheatsheet();

  cheatsheet.name = context?.name || faker.random.word();
  cheatsheet.logoUrl = context?.logoUrl || faker.image.imageUrl();
  cheatsheet.keybinds = [];

  return cheatsheet;
});
