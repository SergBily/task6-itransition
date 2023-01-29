import MessageModel from './MessageModel';

interface ResponseMessageModel extends MessageModel {
  createdAt: string,
  updatedAt: string
  __v: number,
  _id: string
}

export default ResponseMessageModel;
