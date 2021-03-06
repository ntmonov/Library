import { AbstractEntity } from './abstract-entity';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail, IsBoolean, IsString } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: null, nullable: true })
  image: string | null;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  @IsBoolean()
  @Exclude()
  isAdmin: boolean;

  @Column({ default: false })
  @IsBoolean()
  @Exclude()
  isActivated: boolean;

  @Column()
  @IsString()
  @Exclude()
  verificationCode: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async getVerificationCode() {
    this.verificationCode = v4();
  }

  toJSON() {
    return classToPlain(this);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }
}
