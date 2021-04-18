import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cheatsheet } from './Cheatsheet';
import { CheatsheetCategory } from './CheatsheetCategory';

@Entity()
export class Keybind {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cheatsheetId: number;

  @Column()
  categoryId: number;

  @Column()
  name: string;

  @Column()
  keyCombination: string;

  @Column()
  description: string;

  @Column()
  likes: number;

  @ManyToOne(() => Cheatsheet, (cheatsheet) => cheatsheet.keybinds)
  cheatsheet: Cheatsheet;

  @ManyToOne(
    () => CheatsheetCategory,
    (cheatsheetCategory) => cheatsheetCategory.keybinds
  )
  cheatsheetCategory: CheatsheetCategory;
}
