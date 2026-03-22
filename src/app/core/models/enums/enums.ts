export enum ConversationType {
	Tutor = 'tutor',
    CV = 'cv',
}

export enum MessageType{
    ConversationInit ='CONVERSATION_INIT',
    MessageStatus = 'MESSAGE_STATUS',
    MessageContent = 'MESSAGE_CONTENT',
    MessageConfirmation = 'MESSAGE_CONFIRMATION',
}

export enum MessageStatusOptions{
    Start = 'START',
    End = 'END',
    Error = 'ERROR',
}