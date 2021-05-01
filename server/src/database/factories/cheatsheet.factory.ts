import * as Faker from 'faker';
import { Cheatsheet } from '../../entity/Cheatsheet';
import { define } from 'typeorm-seeding';

define(Cheatsheet, (faker: typeof Faker) => {
  const cheatsheet = new Cheatsheet();
  cheatsheet.id = faker.datatype.number();
  cheatsheet.name = faker.random.word();
  cheatsheet.logoUrl = faker.image.imageUrl();
  return cheatsheet;
});
