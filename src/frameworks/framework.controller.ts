import { Controller, Get } from "@nestjs/common";
import { BaseController } from "../common/base.controller";
import { FrameworkModel } from "../domain/models/framework.model";
import { FrameworkService } from "./framework.service";

@Controller('frameworks')
export class FrameworkController extends BaseController<FrameworkModel> {
    constructor(private readonly frameworkService: FrameworkService) {
        super(frameworkService);
    }

    @Get('with-questions')
    async findAllWithQuestions(): Promise<FrameworkModel[]> {
        return this.frameworkService.findAllWithQuestions();
    }
}
