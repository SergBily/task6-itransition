import $api from '../http/api';
import MessageModel from '../models/MessageModel';
import ResponseMessageModel from '../models/ResponseMessageModel';

export default class MessageService {
  static async sendMessage(payload: MessageModel): Promise<void> {
    await $api.post('/message/save', payload);
  }

  static async getMessages(id: string): Promise<ResponseMessageModel[]> {
    const r = await $api.post('/message/get', { id });
    return r.data;
  }

  static async getSendedMessages(id: string): Promise<ResponseMessageModel[]> {
    const r = await $api.post('/message/getSended', { id });
    return r.data;
  }
}
