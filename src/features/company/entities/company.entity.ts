import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nit: string;

  @Column()
  legal_name: string;

  @Column()
  address: string;

  @Column()
  phone: string;
}
