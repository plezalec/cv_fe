export interface MessageInterface {
    id: number;
    content: object;// json content from backend
    sender:'user' | 'bot';
    timestamp: Date;
}
