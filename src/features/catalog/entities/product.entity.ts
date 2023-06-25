import { CompanyEntity } from '@features/company/entities/company.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => CompanyEntity, { nullable: false, eager: true })
  @JoinColumn({ name: 'company_id', referencedColumnName: 'nit' })
  company: CompanyEntity;
}
