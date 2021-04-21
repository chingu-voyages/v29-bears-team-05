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
  const cheatsheetRepository = getRepository(Cheatsheet);
  const keybindRepository = getRepository(Keybind);

  try {
    const cheatsheet = await cheatsheetRepository.findOneOrFail(id, {
      select: ['id', 'name', 'logoUrl'],
    });
    const keybinds = await keybindRepository
      .createQueryBuilder()
      .select('keybind')
      .where('keybind.cheatsheetId = :id', { id: id })
      .getMany();

    res.send({ cheatsheet: cheatsheet, keybinds: keybinds });
  } catch (error) {
    res.status(404).send('Cheatsheet not found');
  }
};

export default {
  getList,
  getOneById,
};
