import { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../models/SocketModel';

const userHandlers = (socket: Socket<ServerToClientEvents, ClientToServerEvents>) => {
  socket.on('session', ({ sessionID, userID }) => {
    socket.auth = { sessionID };
    localStorage.setItem('sessionID', sessionID);
    localStorage.setItem('userID', userID);
  });
};

export default userHandlers;
