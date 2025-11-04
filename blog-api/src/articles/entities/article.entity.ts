import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  summary: string;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({type: 'timestamp', nullable: true})
  publishedAt: Date;

  @Column({type: 'text', array: true ,nullable: true, default: []})
  tags: string[];

  @Column({type: 'int', default: 0})
  viewCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
