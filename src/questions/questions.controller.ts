import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { QuestionService } from "./questions.service";
import { AuthService } from "../auth/auth.service";
import { Public } from "../decorators/set-route-public.decorator";
import { Roles } from "../decorators/roles.decorator";
import { RolesGuard } from "../guards/roles.guard";
import { UserType } from "../domain/models/user.model";
import { QuestionModel } from "../domain/models/question.model";
import { CreateQuestionDto } from "../dto/create.question";
import { BaseController } from "src/common/base.controller";


@Controller('questions')
export class QuestionController extends BaseController<QuestionModel> {

    constructor(private readonly service: QuestionService) { 
        super(service);
    }

    @Public()
    @Post('')
    override async create(@Body() dto: CreateQuestionDto): Promise<QuestionModel> {
        const newUser = await this.service.create(dto.toModel());
        return newUser
    }

    // @Get()
    // findAll() {
    //     return this.service.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.service.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() dto: QuestionModel) {
    //     return this.service.update(dto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.service.delete(+id);
    // }
}

