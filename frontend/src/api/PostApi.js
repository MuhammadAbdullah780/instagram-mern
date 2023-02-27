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
  getSinglePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.get(`/post/${id}`);
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
        const response = await axiosApi.post("/post/create", payload);
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
  updatePost({ id, data }) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.patch(`/post/update/${id}`, data);
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
  deletePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.delete(`/post/delete/${id}`);
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
  likePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.patch(`/post/${id}/like`);
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
  unlikePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.patch(`/post/${id}/unlike`);
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
  addComment({ id, data:text }) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.post(`/post/${id}/comment/add`, text);
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err);
      }
    });
  }
}

const postApi = new PostApi();

export default postApi;
