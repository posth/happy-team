export class Message {
    content: string;
    date: Date;
    status: string;
    username?: string;
    messageId?: string;
    userId?: string;

    constructor(content: string, date: Date, status: string, username?: string, messageId?: string, userId?: string) {
        this.content = content;
        this.date = date;
        this.status = status;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
} 