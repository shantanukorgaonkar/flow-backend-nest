import { ChatMessage, ChatThread } from "../models/chat.model";

class ChatWithAllMessages {

    chatThread: ChatThread;
    messages: ChatMessage[];
    paginationId?: string;

}

export { ChatWithAllMessages }