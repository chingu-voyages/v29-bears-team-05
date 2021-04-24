import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';

const getProfile = async (_req: Request, res: Response) => {
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
  getProfile,
  getList,
  getOneById,
  createUser,
  updateUser,
  deleteUser,
};
