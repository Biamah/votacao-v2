import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pauta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}