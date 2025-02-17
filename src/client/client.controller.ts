import { Controller, Get, Post, Body, UseGuards, Request, Param, Delete, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FrameworkService } from '../frameworks/framework.service';
import { QuestionService } from '../questions/questions.service';
import { JournalEntryService } from '../journal-entry/journal-entry.service';
import { SessionService } from 'src/journal-entry/session.service';

@Controller('client')
@UseGuards(JwtAuthGuard)
export class ClientController {
    constructor(
        private readonly frameworkService: FrameworkService,
        private readonly questionService: QuestionService,
        private readonly journalEntryService: JournalEntryService,
    ) { }

    @Get('conversations')
    async getUserConversations(@Request() req) {
        // Return user's conversation history
        const entries = await this.journalEntryService.findByUserId(req.user.id);
        const sessions = entries.map(entry => {
            if (entry.session) {
                return entry.session.id;
            }
        });
        const uniqueSessions = [...new Set(sessions)];
        return {
            userId: req.user.id,
            conversations: uniqueSessions
        };
    }

    @Get('frameworks/available')
    async getAvailableFrameworks() {
        return this.frameworkService.findAll();
    }

    // @Post('conversations/start')
    // async startNewConversation(@Body() body: { frameworkId?: string }, @Request() req) {
    //     const question = await this.questionService.create({
    //         question: 'Hello, What would you like to talk about?',
    //         hint: 'You can talk about anything you want',
    //         id: null
    //     });
    //     this.journalEntryService.create({
    //         entry: '',
    //         userId: req.user.id,
    //         questionId: question.id,
    //         sessionId: null
    //     });
    //     return question
    // }

    @Get('answers/history')
    async getAnswerHistory(@Request() req) {
        const entries = await this.journalEntryService.findByUserId(req.user.id);
        return {
            userId: req.user.id,
            answers: entries.map(entry => {

                ({
                    id: entry.id,
                    answer: entry.entry,
                    questionId: entry.questionId,
                    sessionId: entry.sessionId
                })
            })
        };
    }

    // @Post('conversations/:conversationId/answer')
    // async submitAnswer(
    //     @Request() req,
    //     @Param('conversationId') conversationId: string,
    //     @Body() body: { questionId: string, answer: string }
    // ) {
    //     const journalEntry = await this.journalEntryService.create({
    //         entry: body.answer,
    //         userId: req.user.id,
    //         questionId: body.questionId,
    //         sessionId: conversationId
    //     });

    //     return {
    //         status: 'success',
    //         answerId: journalEntry.id,
    //         nextQuestion: await this.questionService.findOne(body.questionId)
    //     };
    // }

    @Get('conversations/:conversationId')
    async getConversation(@Param('conversationId') conversationId: string) {
        const entries = await this.journalEntryService.findBySessionId(conversationId);
        if (!entries.length) {
            throw new NotFoundException('Conversation not found');
        }

        return {
            id: conversationId,
            entries: entries.map(entry => ({
                id: entry.id,
                answer: entry.entry,
                question: entry.question
            }))
        };
    }

    @Delete('conversations/:conversationId')
    async deleteConversation(@Param('conversationId') conversationId: string) {
        // TODO: Implement conversation deletion logic
        return {
            status: 'success',
            message: `Conversation ${conversationId} deleted`
        };
    }

    @Get('conversations/:conversationId/question')
    async getCurrentQuestion(
        @Param('conversationId') conversationId: string,
        @Request() req
    ) {
        const entries = await this.journalEntryService.findBySessionId(conversationId);
        const lastEntry = entries[entries.length - 1];
        const frameworkId = req.query.frameworkId; // Add this parameter to the request

        let nextQuestion;
        if (!lastEntry) {
            nextQuestion = await this.questionService.getFirstQuestion(frameworkId);
        } else {
            if (lastEntry.questionId)
                nextQuestion = await this.questionService.getNextQuestion(lastEntry.questionId, frameworkId);
        }

        if (!nextQuestion) {
            throw new NotFoundException('No more questions available');
        }

        return {
            questionId: nextQuestion.id,
            text: nextQuestion.question,
            hint: nextQuestion.hint,
            isLast: await this.questionService.isLastQuestion(nextQuestion.id, frameworkId)
        };
    }

}
