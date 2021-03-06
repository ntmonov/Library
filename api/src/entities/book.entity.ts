import { AbstractEntity } from './abstract-entity';
import { Entity, Column } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { classToPlain } from 'class-transformer';

@Entity('books')
export class BookEntity extends AbstractEntity {
  @Column()
  @IsString()
  author: string;

  @Column()
  @IsString()
  title: string;

  @Column({ default: '' })
  @IsString()
  description: string;

  @Column({
    default:
      'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
  })
  @IsString()
  imageUrl: string;

  @Column()
  @IsNumber()
  price: number;

  toJSON() {
    return classToPlain(this);
  }
}
