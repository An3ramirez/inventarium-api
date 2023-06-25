import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
  @PrimaryColumn()
  nit: string;

  @Column()
  legal_name: string;

  @Column()
  address: string;

  @Column()
  phone: string;
}
