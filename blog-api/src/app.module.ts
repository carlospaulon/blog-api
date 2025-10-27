import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './articles/entities/article.entity';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Article], //article
      migrations: ['dist/database/migrations/*.js'],
      synchronize: false, //deixar como false dps
      migrationsRun: true, //criar migration
    }),
    TypeOrmModule.forFeature([]),
    ArticlesModule, //dps colocar o article module embaixo
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
