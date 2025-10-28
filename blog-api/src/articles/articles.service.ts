import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FilterArticleDto } from './dto/filter-article.dto';
import { QueryBuilder } from 'typeorm/browser';

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

  async findAll(filterDto: FilterArticleDto) {
    const {
      page = 1,
      limit = 10,
      published,
      author,
      tag,
      search,
      sortBy,
      order,
    } = filterDto;

    const skip = (page - 1) * limit;

    const queryBuilder = this.articleRepository.createQueryBuilder('article');

    if (published != undefined) {
      queryBuilder.andWhere('article.published = :published', { published });
    }

    if (author) {
      queryBuilder.andWhere('article.author ILIKE :author', {
        author: `%author%`,
      });
    }

    if (tag) {
      queryBuilder.andWhere(':tag = ANY(article.tags)', { tag });
    }

    if (search) {
      queryBuilder.andWhere(
        'article.title ILIKE :search OR article.content ILIKE :search',
        { search: `%search%` },
      );
    }

    queryBuilder.orderBy(`article.${sortBy}`, order);

    const [articles, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data: articles,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
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

  async findBySlug(slug: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { slug },
    });

    if (!article) {
      throw new NotFoundException(`Article with slug ${slug} not found`);
    }

    article.viewCount += 1;
    await this.articleRepository.save(article);

    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);

    if (updateArticleDto.title) {
      article.slug = this.generateSlug(updateArticleDto.title);
    }

    if (updateArticleDto.published && !article.published) {
      article.publishedAt = new Date();
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
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
