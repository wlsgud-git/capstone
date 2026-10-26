import { useState } from "react";
import "./css/App.css";
import { Route, Routes } from "react-router-dom";

// route
import { Home } from "./page/home";
import { Upload } from "./page/upload";
import { InterviewHome } from "./page/interviewHome";
import { InterviewRoom } from "./page/interviewRoom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<InterviewHome />} />
          <Route path="interview/:chatroomId" element={<InterviewRoom />} />
        </Route>
        <Route path="/resume" element={<Upload />}></Route>
      </Routes>
    </>
  );
}

export default App;
