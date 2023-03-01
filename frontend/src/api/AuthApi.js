import axiosApi from "./Axios";

class AuthApi {
  logIn({ email, password }) {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.post("/auth/login", { email, password });
        res(data);
      } catch (err) {
        rej(err);
      }
    });
  }
  signUp({ email, password, username }) {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.post("/auth/signup", { email, password, username });
        res(data);
        console.log(data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
}

const authApi = new AuthApi()
export default authApi;