import messageModel, { Message } from "./message.model";

export async function createMessage(createMessageDto: any): Promise<Message> {
  return await messageModel.create(createMessageDto);
}
