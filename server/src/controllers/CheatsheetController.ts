import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cheatsheet } from 'src/entity/Cheatsheet';
import { Keybind } from 'src/entity/Keybind';

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
      relations: ['keybinds', 'cheatsheet'],
      where: { cheatsheet: { id: id } },
    });

    res.send(keybinds);
  } catch (error) {
    res.status(404).send('Cheatsheet not found');
  }
};

export default {
  getList,
  getOneById,
};
