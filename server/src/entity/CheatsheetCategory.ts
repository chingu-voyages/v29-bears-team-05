import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Keybind } from './Keybind';

@Entity()
export class CheatsheetCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    index: number;

    @OneToMany(() => Keybind, (keybind) => keybind.cheatsheetCategory)
    keybinds: Keybind[];
}
