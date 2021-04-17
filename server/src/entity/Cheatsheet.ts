import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Keybind } from './Keybind';

@Entity()
export class Cheatsheet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logoUrl: string;

    @OneToMany(() => Keybind, (keybind) => keybind.cheatsheet)
    keybinds: Keybind[];
}
