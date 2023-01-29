// import { Socket } from 'socket.io-client';
// import MessageModel from '../models/MessageModel';
// import { ClientToServerEvents, ServerToClientEvents } from '../models/SocketModel';

class MessageHandlers {
  static socket;

  static sendMessage(m) {
    this.socket.emit('message:send', m);
  }
}

export default MessageHandlers;
