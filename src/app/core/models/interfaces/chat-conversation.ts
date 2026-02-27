import { Message } from './message';

export interface ChatConversation {
    id: number;
    participants: string[];
    messages: Message[];
}
