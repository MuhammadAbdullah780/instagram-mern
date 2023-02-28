import axiosApi from "./Axios";

class AuthApi {
  logIn(body) {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.post("/auth/login", { data: body });
        res(data);
      } catch (err) {
        console.log(err);
        rej(err.message);
      }
    });
  }
}
