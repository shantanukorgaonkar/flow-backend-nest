import { IsNotEmpty, IsString } from "class-validator";
import { ChatThread } from "../domain/models/chat.model";
import { BaseDto } from "../common/base.dto";

export class ChatThreadDto implements BaseDto {
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    userId: string;

    toModel(): ChatThread {
        const model = new ChatThread();
        model.description = this.description;
        model.userId = this.userId;
        return model
    }

}