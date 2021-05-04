import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import config from '../config/config';

const TOKEN_EXPIRATION_DURATION = '1h';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let user;

  if (!(username && password)) {
    res.status(400).send();
  }

  const userRepository = getRepository(User);

  try {
    user = await userRepository.findOneOrFail({
      where: { username },
      relations: [
        'userFavorites',
        'userFavorites.cheatsheet',
        'userFavorites.cheatsheetCategory',
      ],
    });
  } catch (err) {
    res.status(401).send(err.message);

    return;
  }

  const validPassword = await user.validatedUnencryptedPassword(password);

  if (!validPassword) {
    res.status(401).send();

    return;
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    config.jwtSecret,
    {
      expiresIn: TOKEN_EXPIRATION_DURATION,
    }
  );

  const { id, userFavorites } = user;

  res.send({ user: { id, username, userFavorites }, token });
};

const changePassword = async (req: Request, res: Response) => {
  const { userId: id } = res.locals.jwtPayload;
  const { oldPassword, newPassword } = req.body;

  if (!(oldPassword && newPassword)) {
    res.status(400).send();
  }

  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail(id);
  } catch (id) {
    res.status(401).send();

    return;
  }

  if (!user.validatedUnencryptedPassword(oldPassword)) {
    res.status(401).send();

    return;
  }

  user.password = newPassword;
  const errors = await validate(user);

  if (errors.length > 0) {
    res.status(400).send(errors);

    return;
  }

  user.hashPassword();
  userRepository.save(user);

  res.status(204).send();
};

export default {
  login,
  changePassword,
};
