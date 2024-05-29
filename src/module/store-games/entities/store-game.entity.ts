import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StoreGame {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  amount: number;
}
