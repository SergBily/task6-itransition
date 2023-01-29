interface MessageModel {
  sender: SenderOrRecipient,
  recipient: SenderOrRecipient,
  title: string,
  body: string,
}

interface SenderOrRecipient {
  id: string,
  name: string
}

export default MessageModel;
