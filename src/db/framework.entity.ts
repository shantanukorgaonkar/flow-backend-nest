import { framework_entity } from "@prisma/client";
import { FrameworkModel } from "src/domain/models/framework.model";
import { EntityMapper } from "../common/base.entity";
import { FrameworkQuestionEntity } from "../db/framework-question.entity";

export class FrameworkEntity implements framework_entity, EntityMapper<FrameworkModel> {
    id!: string;

    title!: string;

    description!: string;

    frameworkQuestions!: FrameworkQuestionEntity[];

    copy(model: FrameworkModel) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        return this;
    }

    toModel(): FrameworkModel {
        const model = new FrameworkModel();
        model.id = this.id;
        model.title = this.title;
        model.description = this.description;
        return model;
    }

}
