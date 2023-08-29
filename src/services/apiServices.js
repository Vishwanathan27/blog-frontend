import axios from "../shared/apiConstants";

class ApiService {
  register(payload) {
    const endpoint = "/public/user/register";
    return axios.post(endpoint, payload);
  }
  login(payload) {
    const endpoint = "/public/auth/login";
    return axios.post(endpoint, payload);
  }
  createPost(payload) {
    const endpoint = "/private/posts";
    return axios.post(endpoint, payload);
  }
  posts(page = 1, limit = 9, search = undefined) {
    const endpoint = "private/posts";
    return axios.get(endpoint);
  }
  getPostById(id) {
    const endpoint = "/private/posts/" + id;
    return axios.get(endpoint);
  }
  getUserById(id) {
    const endpoint = "/private/user/" + id;
    return axios.get(endpoint);
  }
  updatePost(id, payload) {
    const endpoint = "/private/posts/" + id;
    return axios.put(endpoint, payload);
  }
  deletePost(id) {
    const endpoint = "/private/posts/" + id;
    return axios.delete(endpoint);
  }
  addImage(data) {
    const endpoint = "/private/media";
    return axios.post(endpoint, data);
  }
  getTags() {
    const endpoint = "private/posts/tags";
    return axios.get(endpoint);
  }
}

export default ApiService;
