import * as Faker from 'faker';
import { CheatsheetCategory } from '../../entity/CheatsheetCategory';
import { define } from 'typeorm-seeding';

define(CheatsheetCategory, (faker: typeof Faker) => {
  const category = new CheatsheetCategory();
  category.id = faker.datatype.uuid();
  category.name = faker.random.word();
  category.index = faker.datatype.number();
  return category;
});
