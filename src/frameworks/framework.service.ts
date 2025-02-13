import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "../common/base.service";
import { FrameworkEntity } from "../db/framework.entity";
import { FrameworkModel } from "../domain/models/framework.model";
import { Repository } from "typeorm";

@Injectable()
export class FrameworkService extends BaseService<FrameworkEntity, FrameworkModel> {
    constructor(
        @InjectRepository(FrameworkEntity)
        frameworkRepository: Repository<FrameworkEntity>
    ) {
        super(frameworkRepository, FrameworkEntity);
    }

    async findAllWithQuestions(): Promise<FrameworkModel[]> {
        const entities = await this.repository.find({
            relations: ['frameworkQuestions', 'frameworkQuestions.question']
        });
        return entities.map(entity => entity.toModel());
    }
}
