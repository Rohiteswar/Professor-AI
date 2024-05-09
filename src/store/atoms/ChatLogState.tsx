import { atom } from "recoil";

export enum Type {
  System = "system",
  User = "user"
}

export interface ChatEntry {
  type: Type;
  message: string;
}

export const ChatLogState = atom<ChatEntry[]>({
  key: "ChatLogState",
  default: [],
});
