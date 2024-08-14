import { decryptText } from "../services/encryption.service";

export class MessageDTO {
  id: string;
  isOpened: boolean;
  constructor(data: {
    id: string;
    content: string;
    isOpened: boolean | null;
    reciepientId: string;
  }) {
    this.id = data.id;
    this.isOpened = data.isOpened ?? false;
  }
}

export class SingleMessageDTO {
  id: string;
  isOpened: boolean;
  message: string;
  timeStamp?: Date | null;
  question: string | null | undefined;
  constructor(data: {
    id: string;
    content: string;
    isOpened: boolean | null;
    reciepientId: string;
    createdOn: Date | null;
    question: null | {
      title: string | null;
    };
  }) {
    this.id = data.id;
    this.isOpened = data.isOpened ?? false;
    this.message = decryptText(data.content);
    this.timeStamp = data.createdOn;
    this.question = data.question?.title;
  }
}
