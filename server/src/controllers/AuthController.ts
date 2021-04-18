import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';
import config from '../config/config';

const TOKEN_EXPIRATION_DURATION = '1h';

const login = async (req: Request, res: Response) => {
  let { username, password } = req.body;

  if (!(username && password)) {
    res.status(400).send();
  }

  const userRepository = getRepository(User);
  let user: User;

  try {
    user = await userRepository.findOneOrFail({ where: { username } });
  } catch (error) {
    res.status(401).send();
    return;
  }

  if (!user.validatedUnencryptedPassword(password)) {
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

  res.send(token);
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
