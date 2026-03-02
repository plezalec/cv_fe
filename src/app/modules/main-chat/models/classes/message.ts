import { MessageInterface } from '../interfaces';

export class Message {
  readonly id!: number;
  readonly content!: string;
  readonly sender!: string;
  readonly timestamp!: Date;

  constructor(data : MessageInterface) {
    Object.assign(this, data);
  }
}
