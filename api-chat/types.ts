export interface IMessage {
    id: string;
    author: string;
    message: string;
    datetime: string;
}

export type MessageType = Omit<IMessage, 'id' | 'datetime'>;