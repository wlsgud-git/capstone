import { useEffect, useState } from "react";
import "../css/upload.css";
import { auth_service } from "../service/auth.service";
import { useNavigate } from "react-router-dom";

import { useAtom } from "jotai";
import { userAtom } from "../store/userStore";
import { Loading } from "../components/loading.component";

export const Upload = () => {
  let navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const [resume, setResume] = useState(null);
  const [phone, setPhone] = useState("");
  let [loading, setLoading] = useState(false);

  const authFinish = (user) => {
    setUser(user.user);
    navigate("/");
  };
  // 이력서 업로드 ------------------
  const resumeUpload = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);
      let user = await auth_service.resumeUpload(formData);
      authFinish(user);
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  // 폰번호로 유저 정보 가져오기 (이력서가 이미 등록되어 있는경우)
  const getUserByPhone = async (e) => {
    e.preventDefault();

    try {
      let user = await auth_service.getUserByPhone(phone);
      authFinish(user);
    } catch (err) {
      alert(err);
    }
  };

  // const test = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res = await auth_service.test();
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  let [testInput, setTestInput] = useState("");

  return (
    <div className="page">
      {/* <form onSubmit={test}>
        <input
          type="text"
          value={testInput}
          onChange={(e) => setTestInput(e.target.value)}
        />
      </form> */}

      <div className="upload_box">
        <form onSubmit={getUserByPhone} className="phone_form">
          <input
            type="text"
            placeholder="등록된 휴대번호 입력"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>

        <form className="resume_form" onSubmit={resumeUpload}>
          {loading ? <Loading text={"이력서를 분석중입니다..."} /> : ""}
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResume(e.target.files[0])}
            name="resume"
          />

          <span className="resume_upload_icon">
            <i className="fa-solid fa-upload"></i>
          </span>
          <span className="resume_text">
            이력서를 드래그 하거나 파일을 선택하세요.
          </span>
          <span className="resume_cautions">PDF형식의 파일만 업로드 가능</span>

          <button style={{ display: resume ? "flex" : "none" }}>
            {resume ? resume.name : ""} 업로드
          </button>
        </form>
      </div>
      {/* <span>{bears}</span>
      <button onClick={test}>눌러</button> */}
    </div>
  );
};
