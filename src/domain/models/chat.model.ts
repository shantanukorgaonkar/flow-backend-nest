import { RawCode } from "./code.model";

class ChatThread {
    id?: string;
    description: string;
    userId: string;
    timestamp: Date;
}

class ChatMessage {
    id?: string;
    description: string;
    timestamp: Date;
    type: ChatMessageType;

    constructor(type: ChatMessageType) {
        this.type = type;
        this.timestamp = new Date();
    }
}

enum ChatMessageType {
    USER_TEXT_MESSAGE = "USER_TEXT_MESSAGE",
    MODEL_TEXT_MESSAGE = "MODEL_TEXT_MESSAGE",
    MODEL_CODE_MESSAGE = "MODEL_CODE_MESSAGE",
}

class ChatTextMessage extends ChatMessage {

    keyId?: string;
    content: string;
    
    constructor(content: string, isUserMessage: boolean = true) {
        if (isUserMessage) {
            super(ChatMessageType.USER_TEXT_MESSAGE);
        }
        else {
            super(ChatMessageType.MODEL_TEXT_MESSAGE);
        }
        this.description = content;
        this.content = content;
    }

}

class ChatModelCodeMessage extends ChatMessage {

    keyId?: string;
    content: string;
    modelId: string;
    codeSnippets: RawCode[]
    
    constructor(content: string) {
        super(ChatMessageType.MODEL_CODE_MESSAGE);
        this.description = content;
        this.content = content;
    }

}

export { ChatThread, ChatMessage, ChatMessageType, ChatTextMessage, ChatModelCodeMessage }