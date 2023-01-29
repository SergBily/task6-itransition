import { io, Socket } from 'socket.io-client';
import SERVER_URL from '../environment';
import { ClientToServerEvents, ServerToClientEvents } from '../models/SocketModel';
import { getLocalStorage } from '../utils/localStorage';
import MessageHandlers from './messageHandlers';
import userHandlers from './userHandlers';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_URL,
  { autoConnect: false },
);

export class SocketControl {
  static isUserName = false;

  static setUserName(userName: string): void {
    this.isUserName = true;
    socket.auth = { userName };
    socket.connect();
    userHandlers(socket);
    MessageHandlers.socket = socket;
  }

  static reconnect() {
    const sessionID = localStorage.getItem('sessionID');
    const userID = localStorage.getItem('userID');
    const userName = getLocalStorage('user').name;
    this.isUserName = true;
    socket.auth = { sessionID, userID, userName };
    socket.connect();
    MessageHandlers.socket = socket;
  }

  static disconnect() {
    localStorage.removeItem('user');
    localStorage.removeItem('sessionID');
    localStorage.removeItem('userID');
    socket.disconnect();
  }
}

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
