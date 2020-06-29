import { User } from '@models/user.model';

export interface Message {
  content?: string;
  date?: Date;
  messages?: Array<Message>;
  uid?: string;
  user?: User;
}
