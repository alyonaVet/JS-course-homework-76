export interface IMessage {
  id: string;
  author: string;
  message: string;
  datetime: string;
}

export type ApiMessage = Omit<IMessage, 'id' | 'datetime'>;