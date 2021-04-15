import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
    salt: Buffer;

    @BeforeInsert() async hashPassword() {
        this.password = await argon2.hash(this.password, { salt: this.salt });
    }

    validatedUnencryptedPassword(unencryptedPassword: string) {
        return argon2.verify(unencryptedPassword, this.password);
    }
}
