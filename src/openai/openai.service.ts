import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { ChatCompletion, ChatCompletionAssistantMessageParam, ChatCompletionMessageParam, ChatCompletionSystemMessageParam } from 'openai/resources';
import { ChatMessage, ChatMessageType, ChatModelCodeMessage } from '../domain/models/chat.model';
import { CodeType, RawCode } from '../domain/models/code.model';


@Injectable()
export class OpenaiService {

    apiKey: string;
    client: OpenAI;

    constructor(configService: ConfigService) {
        this.apiKey = configService.get<string>('OPENAI_API_KEY');
        this.client = new OpenAI({
            apiKey: this.apiKey,
            baseURL: "https://oai.hconeai.com/v1",
            defaultHeaders: {
              "Helicone-Auth": "Bearer sk-twzzrvy-dyke5ma-st5bd6i-npj5s7i",
            },
          })
    }


    async getChatReply(prompt: string, context: ChatMessage[]): Promise<string> {
        const history = context.map((message): ChatCompletionMessageParam => {
            return {
                role: message.type === ChatMessageType.USER_TEXT_MESSAGE ? 'user' : 'assistant',
                content: message.description
            }
        })
        const assistant = {
            role: 'system',
            content: 'You are a python coding assistant that will help users code in python. You will be inclided to be a helper for the developer and will give coding solutions as if you are pair coding. Make sure you give helpul suggestions and code snippets and explain the code to the user.'
        } as ChatCompletionMessageParam
        const promptMessage = {
            role: 'system',
            content: prompt
        } as ChatCompletionSystemMessageParam

        const completion: ChatCompletion = await this.client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                assistant,
                ...history,
                promptMessage
            ],

        })
        const [content] = completion.choices.map((choice) => choice.message.content);
        return content;
    }

    async getCodeReply(prompt: string, context: ChatMessage[]): Promise<ChatModelCodeMessage> {
        const history = context.map((message): ChatCompletionMessageParam => {
            return {
                role: message.type === ChatMessageType.USER_TEXT_MESSAGE ? 'user' : 'assistant',
                content: message.description
            }
        })
        const assistant = {
            role: 'system',
            content: 'You are a python coding assistant that will help users code in python. You will be inclided to be a helper for the developer and will give coding solutions as if you are pair coding. Make sure you give helpul suggestions and code snippets and explain the code to the user.'
        } as ChatCompletionMessageParam
        const promptMessage = {
            role: 'system',
            content: prompt
        } as ChatCompletionSystemMessageParam

        const completion: ChatCompletion = await this.client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                assistant,
                ...history,
                promptMessage
            ],

        })
        const [content] = completion.choices.map((choice) => choice.message.content);
        const codes = this.parseChatMessage(content);
        const codeMessage = new ChatModelCodeMessage(content);
        const codeSnippets = codes.map((code) => { 
            const model = new RawCode() 
            model.code = code
            model.description = "Not yet infered"
            model.type = CodeType.PYTHON
            model.index = content.indexOf(code)
            model.length = code.length
            return model
        });
        codeMessage.codeSnippets = codeSnippets;
        codeMessage.modelId = "gpt-3.5-turbo"
        return codeMessage;
    }

    //Extract code snippets from the chat message that openai sends
    private parseChatMessage(content: string): string[] {
        // Regular expression to match code blocks
        const codeBlockRegex = /```([^`]+)```/g;
        let match;
        const codeSnippets: string[] = [];
    
        while ((match = codeBlockRegex.exec(content)) !== null) {
            // Push the matched code snippet to the array
            codeSnippets.push(match[1].trim());
        }
    
        return codeSnippets;
    }


    //Extract code snippets from the chat message that openai sends
    private parseChatMessageCodes(content: string): RawCode[] {

        const codeBlockRegex = /```([^`]+)```/g;
        let match;
        const codeSnippets: RawCode[] = [];
    
        while ((match = codeBlockRegex.exec(content)) !== null) {
            const code = new RawCode()
            code.code = match[1].trim();
            code.description = "Not yet infered"
            code.type = CodeType.PYTHON
            code.index = match.index;
            codeSnippets.length = code.code.length
            codeSnippets.push(code);
        }
    
        return codeSnippets;
    }

}


