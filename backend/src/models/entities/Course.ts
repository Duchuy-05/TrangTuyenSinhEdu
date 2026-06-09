import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Teacher } from './Teacher';
import { CourseSyllabus } from './CourseSyllabus';
import { Registration } from './Registration';

export enum CourseFormat {
  ONLINE = 'online',
  OFFLINE = 'offline',
  HYBRID = 'hybrid',
}

export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'teacher_id' })
  teacherId: number;

  @Column({ nullable: true })
  category: string;

  @Column()
  title: string;

  @Column({ name: 'short_desc', type: 'text', nullable: true })
  shortDesc: string;

  @Column({ type: 'text', nullable: true })
  target: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  duration: string;

  @Column({
    type: 'enum',
    enum: CourseFormat,
    default: CourseFormat.ONLINE,
  })
  format: CourseFormat;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price: number;

  @Column({
    type: 'enum',
    enum: CourseStatus,
    default: CourseStatus.DRAFT,
  })
  status: CourseStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => CourseSyllabus, (syllabus) => syllabus.course, {
    cascade: true,
  })
  syllabus: CourseSyllabus[];

  @OneToMany(() => Registration, (registration) => registration.course)
  registrations: Registration[];
}

