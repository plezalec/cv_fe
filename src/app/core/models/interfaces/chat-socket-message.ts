import { MessageType, MessageStatusOptions } from '@enums';

export interface ChatSocketMessage {
    type: MessageType;
    content: any;
    messageId: number;
}

export interface ConversationInitMessage extends ChatSocketMessage {
    type: MessageType.ConversationInit;
    content: {
        conversationId: number;
    };
}

export function createConversationInitMessage(conversationId: number): ConversationInitMessage {
  return {
    type: MessageType.ConversationInit,
    content: { conversationId },
    messageId: Date.now()
  };
}

export interface MessageConfirmationMessage extends ChatSocketMessage {
    type: MessageType.MessageConfirmation;
    content: {
        messageId: number;
    };
}

export interface MessageStatusMessage extends ChatSocketMessage {
    // The type of the message status (e.g., START, END, ERROR)
    // Both message status messages and message content messages will have same ids, so that the frontend can correlate them
    type: MessageType.MessageStatus;
    content: MessageStatusContent;
}

export interface MessageStatusContent {
    type: MessageStatusOptions;
    content: object;
}

export interface MessageContentMessage extends ChatSocketMessage {
    // The type of the message content (e.g., user message, tutor response)
    // Both message status messages and message content messages will have same ids, so that the frontend can correlate them
    type: MessageType.MessageContent;
    content: object;
}

export interface UserMessage extends ChatSocketMessage {
    type: MessageType.MessageContent;
    content: string;
}

export function createUserMessage(text: string): UserMessage {
    return {
        type: MessageType.MessageContent,
        content: text,
        messageId: Date.now()
    };
}