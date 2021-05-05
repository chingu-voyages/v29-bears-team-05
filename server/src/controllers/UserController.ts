import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import { Keybind } from '../entity/Keybind';

const getFavorites = async (req: Request, res: Response) => {
  const userCredentials = { user: req.body.user, token: req.body.token };
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOneOrFail(
      userCredentials.user.userId,
      {
        select: ['id', 'username'],
        relations: [
          'userFavorites',
          'userFavorites.cheatsheet',
          'userFavorites.cheatsheetCategory',
        ],
      }
    );
    res.send({ user, token: userCredentials.token });
  } catch (error) {
    res.status(404).send('User not found');
  }
};

const addFavorite = async (reqr: Request, res: Response) => {
  const userId = reqr.body.user.id;

  if ('keybinds' in reqr.body === false) {
    res.status(400).send('Error: keybinds property not in request');
    return;
  }

  let query = [] as string[];
  if (typeof reqr.body.keybinds === 'string') {
    query = [reqr.body.keybinds];
  } else if (Array.isArray(reqr.body.keybinds)) {
    query = reqr.body.keybinds;
  } else {
    res.status(400).send('Error: keybinds not an Array<string> or a string');
    return;
  }

  const userRepository = getRepository(User);
  const keybindRepository = getRepository(Keybind);

  // get list of favorites
  const user = (await userRepository
    .findOneOrFail(userId, {
      select: ['id', 'username'],
      relations: ['userFavorites'],
    })
    .catch(() => res.status(404).send('User not found'))) as User;

  // remove if keybind is already in list
  const keybinds_id = user.userFavorites.map((x) => x.id);
  const filtered = query.filter((x) => !keybinds_id.includes(x));

  // get valid keybinds from repository
  const keybindsToAdd = [];
  for (let i = 0; i < filtered.length; i++) {
    const keybind = await keybindRepository
      .findOneOrFail(filtered[i])
      .catch((err) => console.log(err)); // TODO: find better way to handle failed queries
    if (keybind) {
      keybindsToAdd.push(keybind);
    }
  }

  // update the user favorites
  keybindsToAdd.forEach((keybind) => {
    keybind.likes = keybind.likes + 1;
    user.userFavorites.push(keybind);
  });

  await userRepository.save(user);

  res.status(200).send({ user });
};

const deleteFavorite = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  const queryId = req.body.keybind.id;

  const userRepository = getRepository(User);
  const keybindRepository = getRepository(Keybind);

  // get list of favorites
  const user = (await userRepository
    .findOneOrFail(userId, {
      select: ['id', 'username'],
      relations: ['userFavorites'],
    })
    .catch(() => res.status(404).send('User not found'))) as User;

  // reject if keybind not in list
  const queryPosition = user.userFavorites.findIndex((x) => x.id === queryId);
  if (queryPosition < 0) {
    res.status(402).send('Keybind not in favorites');
    return;
  }

  const [removed, ,] = user.userFavorites.splice(queryPosition, 1);
  // ensures likes counter does not go below 0
  removed.likes = Math.max(0, removed.likes - 1);

  await userRepository.save(user);
  await keybindRepository.save(removed);
  res.status(200).send({ user, removed });
};

const getList = async (_req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find({
    select: ['id', 'username', 'email'],
  });

  res.send(users);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ['id', 'username', 'email'],
    });
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = new User();

  user.username = username;
  user.password = password;
  user.email = email;

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  const userRepository = getRepository(User);
  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send('username already in use');
    return;
  }

  res.status(201).send('User created');
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const userRepository = getRepository(User);
  let user;

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send('User not found');
    return;
  }

  user.username = username;
  user.email = email;

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send('username already in use');
    return;
  }

  res.status(204).send();
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send('User not found');
    return;
  }

  userRepository.delete(user.id);

  res.status(204).send();
};

export default {
  getFavorites,
  addFavorite,
  deleteFavorite,
  getList,
  getOneById,
  createUser,
  updateUser,
  deleteUser,
};
