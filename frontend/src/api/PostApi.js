import axiosApi from "./Axios";

class PostApi {
  getAllPosts() {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.get("/post/all");
        res(data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
  getSinglePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.get(`/post/${id}`);
        res(data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
  addPost(payload) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.post("/post/create", payload);
        res(response.data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
  updatePost({ id, data }) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.patch(`/post/update/${id}`, data);
        res(response.data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
  deletePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.delete(`/post/delete/${id}`);
        res(response.data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
  likePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.patch(`/post/${id}/like`);
        res(response.data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
  unlikePost(id) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.patch(`/post/${id}/unlike`);
        res(response.data)
      } catch (err) {
        rej(err.message);
      }
    });
  }
  addComment({ id, text }) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.post(`/post/${id}/comment/add`,{ text });
        res(response.data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
  removeComment(postId, commentId) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.delete(`/post/${postId}/comment/delete`,{ data:{ id:commentId } });
        res(response.data);
      } catch (err) {
        rej(err.message);
      }
    });
  }
}

const postApi = new PostApi();

export default postApi;
