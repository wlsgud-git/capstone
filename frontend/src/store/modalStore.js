// modalAtom.js
import { atom } from "jotai";

// null이면 닫힘, 'interview_room' 같은 키면 해당 모달이 열림
export const modalAtom = atom(false);
