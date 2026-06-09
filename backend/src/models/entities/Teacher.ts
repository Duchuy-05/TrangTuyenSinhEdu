import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Course } from './Course';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  title: string;

  @Column()
  experience: string;

  @Column()
  company: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];
}