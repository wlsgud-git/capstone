import axios from "axios";

// import { store } from "../redux/store";
// import { resetAllstate } from "../redux/actions/root.action";

export class HttpClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        let status = error.response?.status;

        if (status === 401) {
          localStorage.removeItem("user");
          window.location = "/resume";
          unauthorizedHandlers.forEach((fn) => fn());
        }

        return Promise.reject(error);
      },
    );
  }

  async axiosFetch(url, options) {
    let { body, method, headers } = options;

    // 요청에 보낼 정보들
    let req = {
      url,
      method,
      data: body,
      headers: {
        ...headers,
      },
    };

    try {
      let res = await this.client(req);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
