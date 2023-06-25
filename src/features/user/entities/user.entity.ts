import {
  Entity,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from "./role.entity";
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Column({ nullable: true })
  last_login?: Date;

  @ManyToOne(() => RoleEntity, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @BeforeInsert()
  async beforeInsert() {
    const saltRounds = 12;
    this.email = this.email.toLowerCase().trim();
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
}
