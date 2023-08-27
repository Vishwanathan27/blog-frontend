import axios from "../shared/apiConstants";

class ApiService {
  login(payload) {
    let newUrl = "/public/auth/login";
    return axios.post(newUrl, payload);
  }
  posts() {
    let newUrl = "private/posts";
    return axios.get(newUrl);
  }
}

export default ApiService;
