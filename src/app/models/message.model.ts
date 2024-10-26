export type Messages = Message[];

export interface Message {
  role: string;
  content: string;
}

export const USER_ROLE: string = 'user';
export const AI_ROLE: string = 'assistant';
export const SYSTEM_ROLE: string = 'SYSTEM';
