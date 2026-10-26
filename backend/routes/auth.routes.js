import express, { Router } from "express";
import { AuthControl } from "../controls/auth.controls.js";
import { upload } from "../config/file.config.js";
import { XMLParser } from "fast-xml-parser";

const router = express.Router();

// 이력서 업로드
router.post("/resume", upload.single("resume"), AuthControl.resume);
// 유저 정보 가져오기
router.post("/", AuthControl.getUserByPhone);

// 테스트
router.get("/test", async (req, res) => {
  console.log("in test");
  try {
    let key = "0e610d03-b785-444e-a4b7-17069d5cec76";
    const parser = new XMLParser();

    let res = await fetch(
      `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do?authKey=${key}&keyword=${"프론트엔드 개발자"}&callTp=L&returnType=XML&startPage=1&display=10`,
    );
    const xml = await res.text();
    console.log(xml);
    res.status(200).json({ hi: "hi" });
  } catch (err) {
    console.log(err);
  }
  // let { phone_num, name } = lee.users;
  // let { school_name, major, graduate } = lee.education[0];
  // let { school2_name, major2, graduate2 } = lee.education[1];
  // console.log(phone_num, name);
  // console.log(school_name, major, graduate);
  // console.log(lee.education[1]);
});

export default router;
