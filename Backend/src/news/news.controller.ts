/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './news_dtos/createNews.dto';
import { UpdateNewsDto } from './news_dtos/updateNews.dto';

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService){}

    @Post('/add')
    async create(@Body() dto: CreateNewsDto){
        return this.newsService.addNewsToDB(dto);
    }

    @Patch('/update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateNewsDto){
        return this.newsService.updateNews(id, payload);
    }

    @Get('/list')
    async list(){
        return this.newsService.findAll();
    }

    // try it .............................................
    @Get('/:id')
    async view(@Param('id', ParseIntPipe) id: number){
        return this.newsService.findById(id);
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: number){
        return await this.newsService.deleteNews(id);
    }
}