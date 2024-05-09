import { atom } from "recoil";

export const FileState = atom<File | null>({
  key: "FileState",
  default: null,
});
