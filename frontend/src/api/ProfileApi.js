import axiosApi from "./Axios";

class ProfileApi {
  getLoggedInUser () {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.get("/auth/getuser");
        res(data);
      } catch (err) {
        rej(err);
      }
    });
  }
}

const profileApi = new ProfileApi()
export default profileApi;