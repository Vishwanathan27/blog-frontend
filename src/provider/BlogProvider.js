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
  const { login_details, posts, blog_details, img_data, tags } = state;
  const fetchLoginDetails = async (payload) => {
    try {
      const response = await services.login(payload);
      axiosInstance.interceptors.request.use((config) => {
        const token = response.data.token;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      });
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      sessionStorage.setItem("_uid", response.data.user._id);
      dispatch({
        type: blogType.FETCH_LOGIN_DETAILS,
        payload: response,
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: blogType.FETCH_LOGIN_DETAILS,
        payload: err.response,
      });
    }
  };
  const fetchAllPosts = async (page, limit, search) => {
    try {
      const response = await services.posts(page, limit);
      const tagRes = await services.getTags();
      dispatch({
        type: blogType.FETCH_TAGS,
        payload: tagRes,
      });
      dispatch({
        type: blogType.FETCH_ALL_POSTS,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: blogType.FETCH_ALL_POSTS,
        payload: err.response,
      });
    }
  };

  const registerUser = async (payload) => {
    const response = await services.register(payload);
    dispatch({
      type: blogType.REGISTER_USER,
      payload: response,
    });
  };

  const fetchBlogDetails = async (id) => {
    const response = await services.getPostById(id);
    dispatch({
      type: blogType.FETCH_BLOG_DETAILS,
      payload: response,
    });
  };

  const uploadImage = async (base64, type, name) => {
    const imgData = {
      destination: sessionStorage.getItem("_uid"),
      sourcefile: {
        content: base64,
        contentType: type,
        filename: name,
      },
    };
    // console.log(imgData);
    const response = await services.addImage(imgData);
    console.log(response);
    dispatch({
      type: blogType.UPLOAD_IMAGE,
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
        fetchBlogDetails,
        registerUser,
        blog_details,
        img_data,
        uploadImage,
        tags,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
