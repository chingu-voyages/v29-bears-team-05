import faker from 'faker';
import { CheatsheetCategory } from '../../entity/CheatsheetCategory';
import { define } from 'typeorm-seeding';

define(CheatsheetCategory, () => {
  const category = new CheatsheetCategory();
  category.id = faker.datatype.uuid();
  category.name = faker.random.word();
  category.index = 0;
  return category;
});
