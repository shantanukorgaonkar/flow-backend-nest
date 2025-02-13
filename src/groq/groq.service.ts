import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { ChatCompletion, CompletionCreateParams } from 'groq-sdk/resources/chat';

import { ChatMessage, ChatMessageType, ChatModelCodeMessage } from '../domain/models/chat.model';
import { CodeType, RawCode } from '../domain/models/code.model';
import { JournalEntryModel } from 'src/domain/models/journal-entry.model';


@Injectable()
export class GroqAIService {

    apiKey: string;
    client: Groq;
    model: string = "llama-3.1-8b-instant (Meta)"

    constructor(configService: ConfigService) {
        this.apiKey = configService.get<string>('GROQ_API_KEY');
        this.client = new Groq({
            apiKey: this.apiKey

          })
    }

    //Get next Question from the LLM, Based on all the question answers that are given already
    async getNextQuestion(entries: JournalEntryModel[]): Promise<string> {
        const assistantRole = "You are a compassionate daily journaling assistant with expertise in psychology, designed to encourage self-reflection and personal growth. Based on the user's previous responses, generate a short yet meaningful follow-up question that gently guides the conversation deeper. The question should feel natural, avoid repetition, and align with the user’s emotional and cognitive state. "
          +"Maintain a warm and supportive tone, making the user feel heard and valued. If the user's concerns seem resolved or their journaling objective appears met, gracefully conclude the session with a thoughtful closing remark, such as a thank you or a positive affirmation, ensuring they leave feeling good about their progress"
        const history = entries.map((entry) => {
            const data = "question : "+entry.question.question + " answer : "+entry.entry+"----\n"
            return {
                role: 'user',
                content: data
            }
        })
        const assistant = {
            role: 'system',
            content: assistantRole
        } as CompletionCreateParams.Message
        const completion: ChatCompletion = await this.client.chat.completions.create({
            model: this.model,
            messages: [
                assistant,
                ...history
            ],

        })
        const [content] = completion.choices.map((choice) => choice.message.content);
        return content;
    }

}


