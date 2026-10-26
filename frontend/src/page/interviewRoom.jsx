import { useEffect, useState } from "react";
import "../css/interviewRoom.css";
import { auth_service } from "../service/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { useAtom } from "jotai";
import { userAtom } from "../store/userStore";
import { question_service } from "../service/question.service";
import { chat_service } from "../service/chat.service";

import { Loading } from "../components/loading.component";

const Question = ({ info, chatroomId }) => {
  let [open, setOpen] = useState(false);
  let [answer, setAnswer] = useState(info.answer);
  const queryClient = useQueryClient();

  const answerMutation = useMutation({
    mutationFn: ({ questionId, answer }) =>
      question_service.getFeedBack(questionId, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatroom", chatroomId] }); // 이거!
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const getFeedback = async (e) => {
    e.preventDefault();

    if (!answer || answer === "" || info.answer === answer) {
      alert("응답을 안했거나 같은 답입니다.");
      return;
    }
    answerMutation.mutate({ questionId: info.id, answer });
  };

  return (
    <li key={info.id} className="question-card">
      {/* 헤더 부분 */}
      <button
        onClick={() => setOpen(!open)}
        className={`question_header ${open ? "open" : ""}`}
      >
        <div className="question_header_main">
          <div className="question-icon">Q</div>

          <p className="question-text">{info.question}</p>
        </div>
      </button>
      {/* 답변 및 피드백 */}
      <div
        className="answer_section"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="answer_content">
          {/* 답변 */}
          <form className="answer_form" onSubmit={getFeedback}>
            <textarea
              value={answer}
              spellCheck={false}
              onChange={(e) => setAnswer(e.target.value)}
              className="answer-input"
              placeholder="답변을 입력하세요"
            ></textarea>

            <button
              className="submit_button"
              disabled={
                !answer || answer === "" || answerMutation.isPending
                  ? true
                  : false
              }
            >
              답변 제출하기
            </button>
          </form>
          {/* 피드백 */}
          {info.feedback || answerMutation.isPending ? (
            <div
              className="feedback_box"
              style={{
                backgroundColor: `var(--feedback-${answerMutation.isPending ? "loading-" : ""}background-color)`,
                border: `1px solid var(--feedback-${answerMutation.isPending ? "loading-" : ""}border-color)`,
              }}
            >
              {/* 피드백 헤더 */}
              <section className="feedback_header">
                {/* header정보 */}
                <div className="feedback_loading_box">
                  {/* feedback icon */}
                  <span
                    className="feedback_header_icon"
                    style={{
                      color: `var(--${answerMutation.isPending ? "blue" : "white"})`,
                      backgroundColor: `var(--feedback-${answerMutation.isPending ? "loading-" : ""}icon-background-color)`,
                    }}
                  >
                    <i
                      className={`fa-solid fa-${answerMutation.isPending ? "robot" : "check"}`}
                    ></i>
                  </span>
                  <div
                    style={{
                      color: `var(--feedback-${answerMutation.isPending ? "loading-" : ""}main-text-color)`,
                    }}
                    className="feedback_header_text_box"
                  >
                    <span className="feedback_loading_main_text">
                      {`피드백${answerMutation.isPending ? "을 생성하고 있어요" : "이 도착했어요!"}`}
                    </span>
                    <span className="feedback_loading_sub_text">
                      {answerMutation.isPending
                        ? "작성하신 답변을 바탕으로 분석 중입니다."
                        : "AI가 분석한 답변에 대한 피드백입니다."}
                    </span>
                  </div>
                </div>
                {/* loading spinner */}
                {answerMutation.isPending ? (
                  <spinner className="spinner"></spinner>
                ) : (
                  ""
                )}
                {/* <Loading /> */}
              </section>
              https://www.saramin.co.kr/zf_user/search?search_area=main&search_done=y&search_optional_item=n&searchType=search&searchword=
              {}
              <ul
                className="feedback_ul"
                style={{
                  display:
                    !info.feedback || answerMutation.isPending
                      ? "none"
                      : "flex",
                }}
              >
                {info.feedback &&
                  info.feedback.map((val, index) => <li key={index}>{val}</li>)}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
};

export const InterviewRoom = () => {
  const { chatroomId } = useParams();
  let queryClient = useQueryClient();
  let navigate = useNavigate();

  const { data: chatroom } = useQuery({
    queryKey: ["chatroom", chatroomId],
    queryFn: () => chat_service.getChatroom(chatroomId),
  });

  const createMutation = useMutation({
    mutationFn: () =>
      question_service.createQuestions(chatroomId, chatroom.objective),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["chatroom", chatroomId] }); // 목록 자동 갱신
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  let [test, setTest] = useState(true);

  return (
    <div className="interview_room_box">
      <nav className="interview_room_nav">
        <span className="room_objective">{chatroom?.objective}</span>

        <button
          className="job_nav"
          onClick={() =>
            (window.location.href = `https://www.saramin.co.kr/zf_user/search?search_area=main&search_done=y&search_optional_item=n&searchType=search&searchword=${chatroom?.objective}`)
          }
        >
          관련 채용공고
        </button>
      </nav>

      <ul className="question_ul">
        {chatroom?.question.map((val) => (
          <Question key={val.id} info={val} chatroomId={chatroomId} />
        ))}
        <div className="question_add_box">
          {createMutation.isPending ? (
            <div className="question_loading_box">
              <spinner className="spinner"></spinner>
              <span>추가 질문을 생성 중 입니다...</span>
            </div>
          ) : (
            <button
              className="question_add_btn"
              title="질문 추가하기"
              onClick={() => createMutation.mutate()}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};
