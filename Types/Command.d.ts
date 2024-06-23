interface Command {
  name: string;
  description?: string;
  category?: string;
  type?: string;
  run: (client: ClientAttributes, message: Message, args: string[]) => void;
}

export type {Command}