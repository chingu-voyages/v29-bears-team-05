import faker from 'faker';
import { Keybind } from '../../entity/Keybind';
import { define } from 'typeorm-seeding';

define(Keybind, () => {
  const modifier = faker.random.arrayElement(['SHIFT', 'ALT', 'CTRL']);
  const key = faker.random.alpha().toUpperCase();
  const keybind = new Keybind();
  keybind.id = faker.datatype.uuid();
  keybind.name = faker.random.word();
  keybind.keyCombination = `${modifier} + ${key}`;
  keybind.description = faker.random.words();
  keybind.likes = faker.datatype.number();
  return keybind;
});
