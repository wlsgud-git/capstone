import { prisma } from "../config/prisma.js";
import { dbPlay } from "../utils/db.utils.js";

export const AuthData = {
  // 이력서 업로드
  uploadResume: async (data) => {
    try {
      const result = await prisma.users.create({
        data: {
          phone_num: data.users.phone_num,
          name: data.users.name,

          education: {
            createMany: {
              data: data.education.map((e) => ({
                school_name: e.school_name ?? null,
                major: e.major ?? null,
                graduate: e.graduate ?? null,
              })),
            },
          },

          career: {
            createMany: {
              data: data.career.map((c) => ({
                role: c.role ?? null,
                company_name: c.company_name ?? null,
                start_date: c.start_date ? new Date(c.start_date) : null,
                end_date: c.end_date ? new Date(c.end_date) : null,
              })),
            },
          },

          // project: 빈 배열이면 필드 자체를 생략
          ...(data.project.length > 0 && {
            project: {
              createMany: {
                data: data.project.map((p) => ({
                  project_name: p.project_name ?? null,
                  role: p.role ?? null,
                  start_date: p.start_date ? new Date(p.start_date) : null,
                  end_date: p.end_date ? new Date(p.end_date) : null,
                })),
              },
            },
          }),

          // skill: 이제 1:N이므로 createMany 사용
          ...(data.skill.length > 0 && {
            skill: {
              createMany: {
                data: data.skill.map((s) => ({
                  skill: s.skill, // 문자열 배열 그대로 -> JSON 컬럼에 저장
                })),
              },
            },
          }),
        },
        include: {
          education: true,
          career: true,
          project: true,
          skill: true,
        },
      });

      return result;
    } catch (err) {
      throw err;
    }
  },
  // 유저 정보 가져오기
  getUserByPhone: async (phone_num) => {
    try {
      return prisma.users.findUnique({
        where: { phone_num },
        include: {
          education: true,
          career: true,
          project: true,
          skill: true,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  //   회원가입
  register: async (id, name, field, career, password) => {
    try {
      let query = `insert into users values (?,?,?, default)`;
      let data = [id, name, password];
      return dbPlay(query, data);
    } catch (err) {
      console.log(err);
    }
  },
};
