import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNumber()
  @Column('decimal')
  price: number;

  @IsNotEmpty()
  @Column()
  duration: string;
}