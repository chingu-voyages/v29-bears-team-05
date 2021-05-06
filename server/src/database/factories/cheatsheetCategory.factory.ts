import * as Faker from 'faker';
import { datatype } from 'faker';
import { CheatsheetCategory } from '../../entity/CheatsheetCategory';
import { define } from 'typeorm-seeding';

define(CheatsheetCategory, (
  faker: typeof Faker,
  context: Partial<CheatsheetCategory> | undefined
) => {
  const category = new CheatsheetCategory();

  category.name = context?.name || faker.random.word();
  category.index = context?.index || datatype.number();

  return category;
});
