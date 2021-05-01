import * as Faker from 'faker';
import { Keybind } from '../../entity/Keybind';
import { define } from 'typeorm-seeding';

define(Keybind, (faker: typeof Faker) => {
  const keybind = new Keybind();
  keybind.id = faker.datatype.uuid();
  keybind.name = faker.random.word();
  keybind.keyCombination = faker.fake(
    '{{datatype.string(1)}} + {{datatype.string(1)}}'
  );
  keybind.description = faker.random.words();
  keybind.likes = faker.datatype.number();
  return keybind;
});
