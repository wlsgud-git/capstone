import "../css/App.css";
import { ChatroomModal } from "./chatroomModal.component";
import { useAtom } from "jotai";

import { modalAtom } from "../store/modalStore";

let ModalComponent = {
  interview_room: <ChatroomModal />,
};

export const Modal = () => {
  const [modal, setModal] = useAtom(modalAtom);
  return (
    <div
      className="modal"
      style={{ display: !modal ? "none" : "flex" }}
      //   onClick={() => setModal(null)}
    >
      {ModalComponent[modal]}
    </div>
  );
};
