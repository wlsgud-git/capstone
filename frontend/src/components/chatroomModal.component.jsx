import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/chatroomModal.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { modalAtom } from "../store/modalStore";
import { chat_service } from "../service/chat.service";
import { Loading } from "./loading.component";
import { QueryClient } from "@tanstack/react-query";

export const ChatroomModal = () => {
  let navigate = useNavigate();
  let [objective, setObjective] = useState("");
  let setModal = useSetAtom(modalAtom);
  const queryClient = useQueryClient();

  //   // 채팅방 만들기 관련 ----------------------------
  const createMutation = useMutation({
    mutationFn: (objective) => chat_service.createChatroom(objective),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["chatrooms"] }); // 목록 자동 갱신
      setModal(null);
      navigate(`/interview/${res.chatroom.id}`);
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const createChatRoom = async (e) => {
    e.preventDefault();

    if (objective == "") {
      alert("희망분야를 입력해주세요.");
      return;
    }
    createMutation.mutate(objective);
  };

  return (
    <div className="chatroom_modal">
      {createMutation.isPending ? (
        <Loading text={"면접방을 생성 중입니다..."} />
      ) : (
        ""
      )}
      {/* nav */}
      <div className="chatroom_modal_nav">
        <div className="chatroom_modal_nav_intro">
          <span className="chatroom_modal_nav_intro_main">
            <i className="fa-solid fa-door-open"></i>방 만들기
          </span>
          <span className="chatroom_modal_nav_intro_sub">
            새로운 면접 연습방을 만들어보세요.
          </span>
        </div>

        <span
          onClick={() => setModal(null)}
          className="chatroom_modal_close_btn"
        >
          <i className="fa-solid fa-x"></i>
        </span>
      </div>
      {/* form */}
      <form onSubmit={createChatRoom} className="chatroom_modal_form">
        <div className="chatroom_modal_info">
          <div className="chatroom_modal_input_box">
            <label htmlFor="">희망 분야</label>
            <input
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              type="text"
              placeholder="예) 백엔드 개발자"
            />
          </div>
          <div className="chatroom_modal_info_sub_text">
            <i className="fa-solid fa-lightbulb"></i>

            <span>
              희망 분야를 입력하면 해당 분야에 <br />
              맞는 면접 질문을 받을 수 있어요.
            </span>
          </div>
        </div>
        <div className="chatroom_modal_btn">
          <button
            type="button"
            onClick={() => setModal(null)}
            className="chatroom_modal_cancle_btn"
          >
            취소
          </button>
          <button className="chatroom_modal_create_btn">방 만들기</button>
        </div>
      </form>
    </div>
  );
};
