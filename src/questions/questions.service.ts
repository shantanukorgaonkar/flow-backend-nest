import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "../common/base.service";
import { QuestionEntity } from "../db/question.entity";
import { QuestionModel } from "../domain/models/question.model";
import { Repository } from "typeorm";

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, QuestionModel> {
    constructor(
        @InjectRepository(QuestionEntity)
        questionRepository: Repository<QuestionEntity>
    ) {
        super(questionRepository, QuestionEntity);
    }

    async findAllWithFrameworks(): Promise<QuestionModel[]> {
        const entities = await this.repository.find({
            relations: ['frameworkQuestions', 'frameworkQuestions.framework']
        });
        return entities.map(entity => entity.toModel());
    }

    async getFirstQuestion(frameworkId?: string): Promise<QuestionModel> {
        if (!frameworkId) {
            throw new NotFoundException('Framework ID is required');
        }

        const firstQuestion = await this.repository
            .createQueryBuilder('question')
            .innerJoinAndSelect('question.frameworkQuestions', 'fq')
            .where('fq.framework.id = :frameworkId', { frameworkId })
            .orderBy('fq.order', 'ASC')
            .getOne();

        if (!firstQuestion) {
            throw new NotFoundException('No questions found for this framework');
        }

        return firstQuestion.toModel();
    }

    async getNextQuestion(currentQuestionId: string, frameworkId: string): Promise<QuestionModel> {
        const currentFrameworkQuestion = await this.repository
            .createQueryBuilder('question')
            .innerJoinAndSelect('question.frameworkQuestions', 'fq')
            .where('question.id = :questionId', { questionId: currentQuestionId })
            .andWhere('fq.framework.id = :frameworkId', { frameworkId })
            .getOne();

        if (!currentFrameworkQuestion) {
            throw new NotFoundException('Current question not found in framework');
        }

        const currentOrder = currentFrameworkQuestion.frameworkQuestions[0].order;

        const nextQuestion = await this.repository
            .createQueryBuilder('question')
            .innerJoinAndSelect('question.frameworkQuestions', 'fq')
            .where('fq.framework.id = :frameworkId', { frameworkId })
            .andWhere('fq.order > :currentOrder', { currentOrder })
            .orderBy('fq.order', 'ASC')
            .getOne();

        return nextQuestion?.toModel() || null;
    }

    async isLastQuestion(questionId: string, frameworkId: string): Promise<boolean> {
        const currentFrameworkQuestion = await this.repository
            .createQueryBuilder('question')
            .innerJoinAndSelect('question.frameworkQuestions', 'fq')
            .where('question.id = :questionId', { questionId })
            .andWhere('fq.framework.id = :frameworkId', { frameworkId })
            .getOne();

        if (!currentFrameworkQuestion) {
            return true;
        }

        const currentOrder = currentFrameworkQuestion.frameworkQuestions[0].order;

        const nextQuestion = await this.repository
            .createQueryBuilder('question')
            .innerJoinAndSelect('question.frameworkQuestions', 'fq')
            .where('fq.framework.id = :frameworkId', { frameworkId })
            .andWhere('fq.order > :currentOrder', { currentOrder })
            .getOne();

        return !nextQuestion;
    }
}