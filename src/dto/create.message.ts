import { IsNotEmpty, IsString } from "class-validator";
import { ChatMessage, ChatMessageType, ChatTextMessage, ChatThread } from "../domain/models/chat.model";
import { BaseDto } from "../common/base.dto";

export class ChatTextMessageDto implements BaseDto {
    
    @IsNotEmpty()
    @IsString()
    message!: string;

    toModel(): ChatMessage {
        const model = new ChatTextMessage(ChatMessageType.USER_TEXT_MESSAGE);
        model.description = this.message;
        model.content = this.message;
        model.timestamp = new Date();
        return model
    }

}