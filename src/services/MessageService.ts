import $api from '../http/api';
import MessageModel from '../models/MessageModel';

export default class MessageService {
  static async sendMessage(payload: MessageModel): Promise<void> {
    await $api.post('/message/save', payload);
  }

  static async getMessages(id: string): Promise<MessageModel[]> {
    const r = await $api.post('/message/get', { id });
    return r.data;
  }
}
