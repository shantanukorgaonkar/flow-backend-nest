import { IsString } from "class-validator";
import { QuestionModel } from "../domain/models/question.model";
import { BaseDto } from "../common/base.dto";

export class CreateQuestionDto implements BaseDto {

    @IsString()
    question: string;

    @IsString()
    hint: string;

    constructor(question: string, hint: string) {
        this.question = question;
        this.hint = hint;
    }

    toModel() : QuestionModel {
        const model = new QuestionModel();
        model.question = this.question;
        model.hint = this.hint;
        return model;
    }
}