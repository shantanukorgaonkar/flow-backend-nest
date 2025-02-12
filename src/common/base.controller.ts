import { Get, Post, Put, Delete, Body, Param, HttpStatus, HttpException, Patch } from '@nestjs/common';
import { BaseService } from './base.service';
import { EntityMapper } from './base.entity';
import { BaseModel } from './base.model';

export abstract class BaseController<T extends BaseModel> {
    constructor(private readonly baseService: BaseService<EntityMapper<T>, T>) {}

    @Get()
    // @ApiOperation({ summary: 'Find all records' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Found records' })
    async findAll(): Promise<T[]> {
        try {
            return await this.baseService.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    // @ApiOperation({ summary: 'Find record by id' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Record found' })
    // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
    async findOne(@Param('id') id: string): Promise<T> {
        try {
            const entity = await this.baseService.findOne(id);
            if (!entity) {
                throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
            }
            return entity;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    // @ApiOperation({ summary: 'Create new record' })
    // @ApiResponse({ status: HttpStatus.CREATED, description: 'Record created' })
    async create(@Body() createDto: any): Promise<T> {
        try {
            return (await this.baseService.create(createDto)).toModel();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    // @ApiOperation({ summary: 'Update record' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Record updated' })
    async update(@Param('id') id: string, @Body() updateDto: any): Promise<T> {
        try {
            return (await this.baseService.update(updateDto)).toModel();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':id')
    // @ApiOperation({ summary: 'Update record' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Record updated' })
    async partialUpdate(@Param('id') id: string, @Body() updateDto: any): Promise<T> {
        try {
            return (await this.baseService.update(updateDto)).toModel();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    // @ApiOperation({ summary: 'Delete record' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Record deleted' })
    async remove(@Param('id') id: string): Promise<void> {
        try {
            await this.baseService.delete(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}