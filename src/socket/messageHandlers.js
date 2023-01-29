class MessageHandlers {
  static socket;

  static sendMessage(m) {
    this.socket.emit('message:send', m);
  }
}

export default MessageHandlers;
