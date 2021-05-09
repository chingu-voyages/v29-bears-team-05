import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cheatsheet } from './Cheatsheet';
import { CheatsheetCategory } from './CheatsheetCategory';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

@Entity()
export class Keybind {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Length(1, 300)
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  keyCombination: string;

  @IsString()
  @Length(1, 300)
  @Column({ type: 'varchar', length: 300 })
  description: string;

  @IsInt()
  @Column({ type: 'int', default: 0 })
  likes: number;

  @ManyToOne(() => Cheatsheet, (cheatsheet) => cheatsheet.keybinds)
  cheatsheet: Cheatsheet;

  @ManyToOne(
    () => CheatsheetCategory,
    (cheatsheetCategory) => cheatsheetCategory.keybinds
  )
  cheatsheetCategory: CheatsheetCategory;
}
