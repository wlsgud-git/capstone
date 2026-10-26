import { useSetAtom } from "jotai";
import "../css/interviewHome.css";
import { modalAtom } from "../store/modalStore";

export const InterviewHome = () => {
  let setModal = useSetAtom(modalAtom);
  return (
    <div className="interview-home">
      <div className="home-content">
        {/* <header className="home-header">
          <div className="home-logo">✦</div>

          <div>
            <h2>AI Interview</h2>
            <p>나만의 면접 연습 공간</p>
          </div>
        </header> */}

        <section className="home-hero">
          <div className="hero-icon">
            <span>✉</span>
          </div>

          <div className="hero-description">
            <h1>오늘의 면접 준비를 시작해 볼까요?</h1>
            <p>
              희망 직무에 맞는 질문에 답변하고,
              <br />
              AI 피드백을 통해 면접 실력을 키워보세요.
            </p>
          </div>

          <button
            type="button"
            className="start-interview-btn"
            onClick={() => setModal("interview_room")}
          >
            <span className="plus-icon">＋</span>새 면접 시작하기
          </button>

          <span className="hero-caption">
            원하는 직무를 설정하고 바로 연습할 수 있어요.
          </span>
        </section>

        <section className="home-guide">
          <h3>면접 연습 가이드</h3>

          <div className="guide-list">
            <div className="guide-item">
              <div className="guide-icon">01</div>
              <div>
                <h4>희망 직무 설정</h4>
                <p>지원하고 싶은 직무를 입력해 면접을 준비하세요.</p>
              </div>
            </div>

            <div className="guide-item">
              <div className="guide-icon">02</div>
              <div>
                <h4>질문에 답변하기</h4>
                <p>질문을 읽고 실제 면접처럼 답변을 작성하세요.</p>
              </div>
            </div>

            <div className="guide-item">
              <div className="guide-icon guide-icon-success">03</div>
              <div>
                <h4>AI 피드백 확인</h4>
                <p>답변을 분석하고 개선할 부분을 확인하세요.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
