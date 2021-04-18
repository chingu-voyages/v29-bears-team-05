import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Keybind } from "./Keybind";
import { IsInt, IsString, Length } from "class-validator";

@Entity()
export class CheatsheetCategory {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @IsString()
  @Length(1, 300)
  @Column({ type: "varchar", length: 300 })
  name: string;

  // This is the ordering of cheatsheet categories to be presented in the page
  @IsInt()
  @Column({ type: "int" })
  index: number;

  @OneToMany(() => Keybind, (keybind) => keybind.cheatsheetCategory)
  keybinds: Keybind[];
}
