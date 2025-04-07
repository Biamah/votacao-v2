import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Pauta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Column('text')
  @IsNotEmpty({ message: 'Description is required' })
  description: string;
}