import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", null, undefined, {
  getOnInit: true, // 초기화 시점에 즉시 storage 값을 동기적으로 읽어오도록
});
