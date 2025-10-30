import { DataSource } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Article],
  synchronize: false,
});

const articlesData = [
  {
    title: 'Introdução ao NestJS',
    slug: 'introducao-ao-nestjs',
    content:
      'NestJS é um framework progressivo para construir aplicações Node.js eficientes e escaláveis. Ele usa TypeScript por padrão e combina elementos de OOP (Programação Orientada a Objetos), FP (Programação Funcional) e FRP (Programação Reativa Funcional).',
    summary: 'Um guia completo para começar com NestJS',
    author: 'Maria Santos',
    tags: ['nodejs', 'nestjs', 'typescript', 'backend'],
    published: true,
    publishedAt: new Date('2024-01-15'),
  },
  {
    title: 'Docker para Iniciantes',
    slug: 'docker-para-iniciantes',
    content:
      'Docker é uma plataforma de containerização que facilita o desenvolvimento, envio e execução de aplicações. Com Docker, você pode empacotar uma aplicação e suas dependências em um container virtual que pode rodar em qualquer servidor Linux.',
    summary: 'Aprenda os conceitos básicos de Docker',
    author: 'João Silva',
    tags: ['docker', 'devops', 'containers'],
    published: true,
    publishedAt: new Date('2024-02-10'),
  },
  {
    title: 'GraphQL vs REST',
    slug: 'graphql-vs-rest',
    content:
      'GraphQL e REST são duas abordagens diferentes para construir APIs. Enquanto REST usa múltiplos endpoints para diferentes recursos, GraphQL usa um único endpoint e permite que o cliente especifique exatamente os dados que precisa.',
    summary: 'Comparação entre GraphQL e REST APIs',
    author: 'Ana Costa',
    tags: ['graphql', 'rest', 'api'],
    published: false,
  },
  {
    title: 'TypeScript Avançado',
    slug: 'typescript-avancado',
    content:
      'TypeScript adiciona tipagem estática ao JavaScript, tornando o código mais seguro e manutenível. Neste artigo, exploramos recursos avançados como generics, decorators, utility types e muito mais.',
    summary: 'Recursos avançados do TypeScript',
    author: 'Pedro Alves',
    tags: ['typescript', 'javascript'],
    published: true,
    publishedAt: new Date('2024-03-05'),
  },
  {
    title: 'MongoDB ou PostgreSQL',
    slug: 'mongodb-ou-postgresql',
    content:
      'Escolher entre MongoDB e PostgreSQL depende das necessidades do seu projeto. MongoDB é ideal para dados não estruturados e escalabilidade horizontal, enquanto PostgreSQL oferece robustez ACID e queries complexas.',
    summary: 'Guia para escolher seu banco de dados',
    author: 'Maria Santos',
    tags: ['mongodb', 'postgresql', 'database'],
    published: true,
    publishedAt: new Date('2024-03-20'),
  },
  {
    title: 'Microservices na Prática',
    slug: 'microservices-na-pratica',
    content:
      'Arquitetura de microservices divide aplicações em serviços menores e independentes que se comunicam através de APIs. Cada serviço pode ser desenvolvido, implantado e escalado independentemente.',
    summary: 'Implementando arquitetura de microservices',
    author: 'Carlos Lima',
    tags: ['microservices', 'architecture', 'backend'],
    published: false,
  },
  {
    title: 'CI/CD com GitHub Actions',
    slug: 'cicd-com-github-actions',
    content:
      'GitHub Actions permite automatizar workflows de CI/CD diretamente no GitHub. Configure pipelines para testes, builds e deploys automáticos toda vez que fizer push no repositório.',
    summary: 'Automatize seu workflow com GitHub Actions',
    author: 'João Silva',
    tags: ['cicd', 'github', 'devops', 'automation'],
    published: true,
    publishedAt: new Date('2024-04-01'),
  },
  {
    title: 'Clean Code em JavaScript',
    slug: 'clean-code-em-javascript',
    content:
      'Escrever código limpo é essencial para manutenibilidade e colaboração em equipe. Aprenda princípios como SOLID, DRY, KISS e como aplicá-los em JavaScript/TypeScript.',
    summary: 'Princípios de código limpo para JavaScript',
    author: 'Ana Costa',
    tags: ['cleancode', 'javascript', 'bestpractices'],
    published: true,
    publishedAt: new Date('2024-04-15'),
  },
  {
    title: 'Testes Automatizados com Jest',
    slug: 'testes-automatizados-com-jest',
    content:
      'Jest é um framework de testes JavaScript mantido pelo Facebook. Ele oferece uma experiência completa incluindo assertions, mocks, coverage e muito mais, tudo configurado out-of-the-box.',
    summary: 'Guia completo de testes com Jest',
    author: 'Pedro Alves',
    tags: ['jest', 'testing', 'javascript'],
    published: true,
    publishedAt: new Date('2024-05-01'),
  },
  {
    title: 'Redis para Cache',
    slug: 'redis-para-cache',
    content:
      'Redis é um banco de dados em memória extremamente rápido, perfeito para cache. Aprenda como implementar estratégias de cache para melhorar drasticamente a performance da sua aplicação.',
    summary: 'Implementando cache com Redis',
    author: 'Carlos Lima',
    tags: ['redis', 'cache', 'performance'],
    published: true,
    publishedAt: new Date('2024-05-10'),
  },
];

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection\n');

    const articleRepository = AppDataSource.getRepository(Article);

    for (const articleData of articlesData) {
      const exists = await articleRepository.findOne({
        where: { slug: articleData.slug },
      });

      if (!exists) {
        const article = articleRepository.create(articleData);
        await articleRepository.save(article);
        console.log(`Created: ${article.title}`);
      } else {
        console.log(`Skipped: ${articleData.title}`); //already created
      }
    }

    console.log('\nSeed completed');
    await AppDataSource.destroy();
    process.exit(0);
  } catch (err) {
    console.error('\nError seeding data', err);
    process.exit(1)
  }
}

seed();
