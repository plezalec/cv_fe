export interface MessageInterface {
    id: number;
    content: object;// json content from backend
    sender:'user' | 'tutor',
    timestamp: Date;
}
