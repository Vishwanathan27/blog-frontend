import { createContext, useReducer } from "react";
import blogReducer, { INITIAL_STATE } from "./BlogReducer";
import blogType from "./BlogType";
import ApiServices from "../services/apiServices";
import axiosInstance from "@/shared/apiConstants";

const services = new ApiServices();
export const BlogContext = createContext({
  ...INITIAL_STATE,
});
const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, INITIAL_STATE);
  const { login_details, posts } = state;
  const fetchLoginDetails = async (payload) => {
    const response = await services.login(payload);
    localStorage.setItem("token", JSON.stringify(response.data.token));
    axiosInstance.interceptors.request.use((config) => {
      const token = response.data.token;
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });
    dispatch({
      type: blogType.FETCH_LOGIN_DETAILS,
      payload: response,
    });
  };
  const fetchAllPosts = async () => {
    const response = await services.posts();
    dispatch({
      type: blogType.FETCH_ALL_POSTS,
      payload: response,
    });
  };
  return (
    <BlogContext.Provider
      value={{
        ...state,
        fetchLoginDetails,
        login_details,
        fetchAllPosts,
        posts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
