import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Keybind } from "./Keybind";
import { IsString, Length } from "class-validator";

@Entity()
export class Cheatsheet {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @IsString()
  @Length(1, 300)
  @Column({ type: "varchar", length: 300 })
  name: string;

  @Column({ type: "varchar", nullable: true })
  logoUrl: string;

  @OneToMany(() => Keybind, (keybind) => keybind.cheatsheet)
  keybinds: Keybind[];
}
