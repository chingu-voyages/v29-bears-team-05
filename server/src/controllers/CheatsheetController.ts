import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cheatsheet } from '../entity/Cheatsheet';

const getList = async (_req: Request, res: Response): Promise<void> => {
  const cheatsheetRepository = getRepository(Cheatsheet);
  const cheatsheets = await cheatsheetRepository.find({
    select: ['id', 'name', 'logoUrl'],
  });

  res.send(cheatsheets);
};

const getOneById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const cheatsheetRepository = getRepository(Cheatsheet);

  try {
    const cheatsheet = await cheatsheetRepository.findOneOrFail(id, {
      relations: [
        'keybinds',
        'keybinds.cheatsheet',
        'keybinds.cheatsheetCategory',
      ],
    });
    res.send(cheatsheet);
  } catch (error) {
    res.status(404).send(error);
  }
};

export default {
  getList,
  getOneById,
};
