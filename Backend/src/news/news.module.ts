/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/typeOrm/entities/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
