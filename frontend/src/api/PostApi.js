import axiosApi from "./Axios";

class PostApi {
  getAllPosts() {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.get("/post/all");
        res(data);
      } catch (error) {
        console.log(error);
        rej(error.msg);
      }
    });
  }
  addPost(payload) {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.post("/post/create", { payload });
        console.log(data);
        res(data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
}

const postApi = new PostApi();

export default postApi;
