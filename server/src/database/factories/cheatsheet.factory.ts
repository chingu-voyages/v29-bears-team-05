import faker from 'faker';
import { Cheatsheet } from '../../entity/Cheatsheet';
import { define } from 'typeorm-seeding';

define(Cheatsheet, () => {
  const cheatsheet = new Cheatsheet();

  cheatsheet.id = faker.datatype.uuid();
  cheatsheet.name = faker.random.word();
  cheatsheet.logoUrl = faker.image.imageUrl();

  return cheatsheet;
});
