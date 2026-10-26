import { hashedText } from "../utils/bcrypt.utils.js";
import { AuthData } from "../data/auth.data.js";
import { createjwt } from "../utils/jwt.utils.js";
import { compareText } from "../utils/bcrypt.utils.js";
import { aiPlay } from "../utils/ai.utils.js";
import { extractJson } from "../middleware/auth.middleware.js";

export const AuthServices = {
  // 이력서 업로드
  resume: async (file) => {
    try {
      let prompt = `이 이력서를 조건대로 분석해줘 
      조건1. 밑에 데이터 베이스 구조에 관한 것만 매우 구체적으로 json형식으로 응답한다.
      조건2. 유저 테이블은 반드시 한명이니 {} 형태로 주고 나머지 테이블은 여러개 일 수 있으니 []형태로 준다.
      조건3. 각 테이블의 phone_num은 -없이 숫자부분만 넘겨준다.
      조건4. skill테이블의 skill은 구분없이 [] 안에 모두 넘겨준다.  
      조건5. json.parse()의 괄호 안에 넣을것만 정확히 텍스트로 넘겨준다.

-- 유저
create table users (
    phone_num varchar(11) primary key not null, 
    name varchar(20) not null
);

-- 학력
create table education (
    id int auto_increment primary key not null,
    phone_num varchar(11) not null, 
    school_name varchar(15) default null,
    major varchar(20) default null,
    graduate boolean default null,
    
    foreign key (phone_num) references users(phone_num) on delete cascade
);

-- 경력
create table career (
    id int auto_increment primary key not null,
    phone_num varchar(11) not null,
    role varchar(30) default null,
    company_name varchar(40) default null,
    start_date timestamp default null,
    end_date timestamp default null,

    foreign key (phone_num) references users(phone_num) on delete cascade
);

-- 프로젝트
create table project (
    id int auto_increment primary key not null,
    phone_num varchar(11) not null,
    project_name varchar(50) default null,
    role varchar(30) default null,
    start_date timestamp default null,
    end_date timestamp default null,

    foreign key (phone_num) references users(phone_num) on delete cascade
) ;

-- 스킬
create table skill(
    id int auto_increment primary key not null,
    phone_num varchar(11) not null,
    skill json default null,

    foreign key (phone_num) references users(phone_num) on delete cascade
);`;
      let result = await aiPlay(prompt, file);
      let info_json = await extractJson(result);

      let user = await AuthData.uploadResume(info_json);

      return user;
    } catch (err) {
      console.log(err);
    }
  },

  // 유저 정보 가져오기
  getUserByPhone: async (phone_num) => {
    try {
      return AuthData.getUserByPhone(phone_num);
    } catch (err) {
      console.log(err);
    }
  },
};
