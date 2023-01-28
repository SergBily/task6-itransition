import $api from '../http/api';
import MessageModel from '../models/MessageModel';

export default class MessageService {
  static async sendMessage(payload: MessageModel): Promise<void> {
    await $api.post('/message', payload);
  }
}
