import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cheatsheet } from '../entity/Cheatsheet';
import { Keybind } from '../entity/Keybind';

const getList = async (_req: Request, res: Response) => {
  const cheatsheetRepository = getRepository(Cheatsheet);
  const cheatsheets = await cheatsheetRepository.find({
    select: ['id', 'name', 'logoUrl'],
  });

  res.send(cheatsheets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const keybindRepository = getRepository(Keybind);

  try {
    const keybinds = await keybindRepository.find({
      relations: ['cheatsheet', 'cheatsheetCategory'],
      where: { cheatsheet: { id: id } },
    });

    res.send(keybinds);
  } catch (error) {
    res.status(404).send(error);
  }
};

export default {
  getList,
  getOneById,
};
