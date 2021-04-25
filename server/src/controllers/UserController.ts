import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import { Keybind } from '../entity/Keybind';

const getFavorites = async (_req: Request, res: Response) => {
  const userCredentials = { user: _req.body.user, token: _req.body.token };
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

const addFavorite = async (_req: Request, res: Response) => {
  const userId = _req.body.user.id;
  const queryId = _req.body.keybind.id;

  const userRepository = getRepository(User);
  const keybindRepository = getRepository(Keybind);

  // get list of favorites
  const user = (await userRepository
    .findOneOrFail(userId, {
      select: ['id', 'username'],
      relations: ['userFavorites'],
    })
    .catch(() => res.status(404).send('User not found'))) as User;

  // reject if keybind is already in list
  const keybinds_id = user.userFavorites.map((x) => x.id);
  if (keybinds_id.includes(queryId)) {
    res.status(403).send('Keybind already in favorites');
    return;
  }

  const keybind = (await keybindRepository
    .findOneOrFail(queryId)
    .catch(() => res.status(404).send('Keybind not found'))) as Keybind;

  user.userFavorites.push(keybind);
  await userRepository.save(user);
  res.status(200).send(user);
};

const deleteFavorite = async (_req: Request, _res: Response) => {};

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
    res.status(404).send('User not found');
  }
};

const createUser = async (req: Request, res: Response) => {
  let { username, email, password } = req.body;
  let user = new User();

  user.username = username;
  user.password = password;
  user.email = email;

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  user.hashPassword();

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
