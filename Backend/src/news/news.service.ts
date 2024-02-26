/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/typeOrm/entities/faculties.entity';
import { News } from 'src/typeOrm/entities/news.entity';
import { CreateNewsParams, UpdateNewsParams } from 'src/utils/news_types';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
    constructor(@InjectRepository(News) private newsRepository: Repository<News>){}

    async addNewsToDB(newsDetails: CreateNewsParams){
        const newNews = this.newsRepository.create(newsDetails);
        newNews.faculties = newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id})); 
        return await this.newsRepository.save(newNews);
    }

    async updateNews(id: number, newsDetails: UpdateNewsParams){
        const ret = await this.newsRepository.findOne({where: {news_id: id}});
        if(ret == null) return `There is no news with id = ${id}`;
        if(newsDetails.title != undefined) ret.title = newsDetails.title;
        if(newsDetails.description != undefined) ret.description = newsDetails.description;
        if(newsDetails.link != undefined) ret.link = newsDetails.link;
        if(newsDetails.faculties_ids != undefined){
            ret.faculties = newsDetails.faculties_ids.map(faculty_id => ({...new Faculty(), faculty_id}));
        }
        return await this.newsRepository.save(ret);
    }

    async findAll(){
        return await this.newsRepository.find();
    }

    async findById(news_id: number){
        const ret = await this.newsRepository.findOne({where: {news_id}});
        return (ret == null ? `There is no news with id = ${news_id}` : ret);
    }

    async deleteNews(id: number){
        await this.newsRepository.delete(id);
        return 'This news is deleted successfully';
    }
}