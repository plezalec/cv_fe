import { MessageInterface } from './message-interface';

export interface ChatConversationInterface {
    id: number;
    messages: MessageInterface[];
}
