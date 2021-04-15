import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Cheatsheet } from "./Cheatsheet";
import { CheatsheetCategory } from "./CheatsheetCategory";

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

  @ManyToOne((type) => Cheatsheet, (cheatsheet) => cheatsheet.keybinds)
  cheatsheet: Cheatsheet;

  @ManyToOne(
    (type) => CheatsheetCategory,
    (cheatsheetCategory) => cheatsheetCategory.keybinds
  )
  cheatsheetCategory: CheatsheetCategory;
}
