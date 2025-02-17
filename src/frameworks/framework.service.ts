import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "../common/base.service";
import { FrameworkEntity } from "../db/framework.entity";
import { FrameworkModel } from "../domain/models/framework.model";
import { Repository } from "typeorm";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FrameworkService extends BaseService<FrameworkEntity, FrameworkModel> {
    constructor(
        private prisma: PrismaService
    ) {
        super(FrameworkEntity);
    }

    async findAllWithQuestions(): Promise<FrameworkModel[]> {
        // const entities = await this.repository.find({
        //     relations: ['frameworkQuestions', 'frameworkQuestions.question']
        // });
        // return entities.map(entity => entity.toModel());

        const entities = await this.prisma.framework_entity.findMany({
            include: {
                framework_question_entity: { include: { question_entity: true } },
            }
        })
        return entities.map(entity => entity.toModel());
    }
}
