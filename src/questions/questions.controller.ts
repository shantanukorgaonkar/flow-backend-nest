import { Body, Controller, Get, Post } from "@nestjs/common";
import { QuestionService } from "./questions.service";
import { Public } from "../decorators/set-route-public.decorator";
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

    @Get('with-frameworks')
    async findAllWithFrameworks(): Promise<QuestionModel[]> {
        return this.service.findAllWithFrameworks();
    }

}

