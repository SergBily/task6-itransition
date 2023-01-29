import { Socket } from 'socket.io-client';
import MessageModel from './MessageModel';

export interface ServerToClientEvents {
  session: (a: SessionData) => void
  'message:receive': (m: MessageModel) => void
  userID: string
}

export interface ClientToServerEvents {
  'message:send': string;
}

interface SessionData {
  sessionID: string,
  userID: string
}

export interface CustomSocket extends Socket<ServerToClientEvents, ClientToServerEvents> {
  userID: string
}
