import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    @Length(4, 20)
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    @Length(4, 100)
    password: string;

    @Column()
    salt: number;

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, this.salt);
    }
}
