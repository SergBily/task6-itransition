import { Socket } from 'socket.io-client';
import ResponseMessageModel from './ResponseMessageModel';

export interface ServerToClientEvents {
  session: (a: SessionData) => void
  'message:receive': (m: ResponseMessageModel) => void
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
