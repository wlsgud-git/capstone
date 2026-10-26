import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { chat_service } from "../service/chat.service";
import { question_service } from "../service/question.service";

import "../css/home.css";

import { useAtom, useSetAtom } from "jotai";
import { userAtom } from "../store/userStore";
import { Loading } from "../components/loading.component";
import { modalAtom } from "../store/modalStore";

export const Home = () => {
  const match = useMatch("/interview/:roomId");
  const roomId = match?.params.roomId;
  let navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  const setModal = useSetAtom(modalAtom);
  const queryClient = useQueryClient();

  const {
    data: chatrooms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["chatrooms"],
    queryFn: () => chat_service.getChatrooms(),
    // enabled: !!user, // user 있을 때만 실행
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 테스트용 면접이력 여닫이
  let [testopen, settestopen] = useState(true);

  // 채팅방 삭제
  const deleteChatRoom = useMutation({
    mutationFn: (id) => chat_service.deleteChatroom(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["chatrooms"] }); // 목록 자동 갱신
      setCurrent((c) => ({ ...c, index: null }));
      navigate("/");
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  return (
    <div className="page">
      {/* 사이트바 버튼 */}
      <button
        title="사이드바 열기"
        onClick={() => setSidebarOpen(true)}
        className="sidebar_btn"
        style={{ display: sidebarOpen ? "none" : "block" }}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {/* 사이드바 부분 */}
      <div
        className="sidebar"
        style={{ display: sidebarOpen ? "flex" : "none" }}
      >
        {/* 로고 */}
        <div className="logo_section">
          <span className="logo" onClick={() => navigate("/")}>
            <i className="fa-solid fa-robot"></i>AI면접봇
          </span>

          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        {/* 옵션 */}
        <ul className="sidebar_option_list">
          {/* 면접방 만들기 */}
          <li
            className="sidebar_option_li chat_add_Btn"
            onClick={() => setModal("interview_room")}
          >
            <button className="sidebar_option_btn">
              <span>
                <i className="fa-solid fa-plus"></i>
                면접하기
              </span>
            </button>
          </li>
          {/* 이력서 페이지로 */}
          <li
            className="sidebar_option_li nav_resume"
            onClick={() => navigate("/resume")}
          >
            <button className="sidebar_option_btn">
              <span>
                <i className="fa-solid fa-id-card"></i>
                이력서 수정
              </span>
            </button>
          </li>
          {/* 내 면접이력 */}
          <li className="sidebar_option_li my_chatrooms">
            <button
              className="sidebar_option_btn"
              onClick={() => settestopen(!testopen)}
            >
              <span>
                <i className="fa-regular fa-file-lines"></i>
                면접 이력
              </span>

              <span>
                <i
                  className={`fa-solid fa-angle-${testopen ? "down" : "right"}`}
                ></i>
              </span>
            </button>
            {/* 면접 이력 목록 */}
            <ul
              className="my_chatroom_ul"
              style={{ display: testopen ? "block" : "none" }}
            >
              {chatrooms.map((val) => (
                <li
                  key={val.id}
                  title={val.objective}
                  onClick={() => navigate(`/interview/${val.id}`)}
                >
                  <div
                    style={{
                      color: `var(--${roomId && val.id == roomId ? "blue" : "black"})`,
                    }}
                  >
                    <i className="fa-regular fa-circle"></i>
                    <span>{val.objective}</span>
                  </div>

                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChatRoom.mutate(val.id);
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </p>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        {/* 유저 정보 */}
        <div className="sidebar_user_box">
          <span className="sidebar_user_name">{user?.name}</span>
          <span className="sidebar_user_phone">{user?.phone_num}</span>
        </div>
      </div>
      {/* 면접 채팅 부분 */}
      <div className="interview_container">
        <div className="interview_box">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
