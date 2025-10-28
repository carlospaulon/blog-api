import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const slug = this.generateSlug(createArticleDto.title);

    const article = this.articleRepository.create({
      ...createArticleDto,
      slug,
      publishedAt: createArticleDto.published ? new Date() : undefined,
    });

    return await this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    article.viewCount += 1;
    await this.articleRepository.save(article);

    return article;
  }


  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);

    if (updateArticleDto.title) {
        article.slug = this.generateSlug(updateArticleDto.title);
    }

    if(updateArticleDto.published && !article.published) {
        article.publishedAt = new Date();
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article)
  }

  async remove(id: string): Promise<void> {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
  }


  //métodos utilitários
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') //acento
      .replace(/[^\w\s-]/g, '') //caracteres
      .replace(/\s+/g, '-') //espaço por hifen
      .replace(/-+/g, '-') //double hifens
      .trim();
  }
}
