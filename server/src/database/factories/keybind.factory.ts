import * as Faker from 'faker';
import { Keybind } from '../../entity/Keybind';
import { define } from 'typeorm-seeding';

define(Keybind, (
  faker: typeof Faker,
  context: Partial<Keybind> | undefined
) => {
  const modifier = faker.random.arrayElement(['SHIFT', 'ALT', 'CTRL']);
  const key = faker.random.word().toUpperCase();
  const keybind = new Keybind();

  keybind.name = context?.name || faker.random.word();
  keybind.keyCombination = context?.keyCombination || `${modifier} + ${key}`;
  keybind.description = context?.description || faker.random.words();
  keybind.likes = context?.likes || faker.datatype.number();

  return keybind;
});
