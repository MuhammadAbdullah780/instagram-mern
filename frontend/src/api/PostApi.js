import axiosApi from "./Axios";

class PostApi {
  getAllPosts() {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await axiosApi.get("/post/all");
        res(data);
      } catch (err) {
        console.log(err);
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
        console.log(err);
        rej(err.message);
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
        rej(err.message);
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
        rej(err.message);
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
        rej(err.message);
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
        rej(err.message);
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
        rej(err.message);
      }
    });
  }
  addComment({ id, text }) {
    console.log("id: ",id);
    console.log("text: ",text);
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.post(`/post/${id}/comment/add`,{ text });
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err.message);
      }
    });
  }
  removeComment(postId, commentId) {
    return new Promise(async (res, rej) => {
      try {
        const response = await axiosApi.delete(`/post/${postId}/comment/delete`,{ data:{ id:commentId } });
        console.log(response);
        res(response.data);
      } catch (err) {
        console.log(err);
        rej(err.message);
      }
    });
  }
}

const postApi = new PostApi();

export default postApi;
