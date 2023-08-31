import { createContext, useReducer } from "react";
import blogReducer, { INITIAL_STATE } from "./BlogReducer";
import blogType from "./BlogType";
import ApiServices from "../services/apiServices";
import axiosInstance from "@/shared/apiConstants";
import { useRouter } from "next/router";

const services = new ApiServices();
export const BlogContext = createContext({
  ...INITIAL_STATE,
});

const BlogProvider = ({ children }) => {
  const router = useRouter();
  const handleApiResponse = (response) => {
    console.log(response);
    if (
      response?.data &&
      response?.data.success === false &&
      response?.data.message === "Invalid token"
    ) {
      setTimeout(() => {
        logoutUser();
      }, 2000);
    }
  };
  const logoutUser = () => {
    sessionStorage.removeItem("token");
    if (axiosInstance.defaults.headers.common["Authorization"]) {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
    router.push("/login");
  };
  const [state, dispatch] = useReducer(blogReducer, INITIAL_STATE);
  const {
    login_details,
    posts,
    blog_details,
    img_data,
    tags,
    registered_user,
    upload_blog,
    delete_blog,
    updated_posts,
  } = state;
  const fetchLoginDetails = async (payload) => {
    try {
      const response = await services.login(payload);
      dispatchUserEntry(response);
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
      handleApiResponse(err.response);
      dispatch({
        type: blogType.FETCH_ALL_POSTS,
        payload: err.response,
      });
    }
  };

  const registerUser = async (payload) => {
    try {
      const response = await services.register(payload);
      dispatch({
        type: blogType.REGISTER_USER,
        payload: response,
      });
    } catch (err) {
      dispatch({
        type: blogType.REGISTER_USER,
        payload: err.response,
      });
    }
  };

  const fetchBlogDetails = async (id) => {
    try {
      const response = await services.getPostById(id);
      dispatch({
        type: blogType.FETCH_BLOG_DETAILS,
        payload: response,
      });
    } catch (err) {
      handleApiResponse(err.response);
      dispatch({
        type: blogType.FETCH_BLOG_DETAILS,
        payload: err.response,
      });
    }
  };

  const dispatchUserEntry = (response) => {
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
  };

  const uploadImage = async (base64, type, name) => {
    try {
      const imgData = {
        destination: sessionStorage.getItem("_uid"),
        sourcefile: {
          content: base64,
          contentType: type,
          filename: name,
        },
      };

      const response = await services.addImage(imgData);

      dispatch({
        type: blogType.UPLOAD_IMAGE,
        payload: response,
      });
    } catch (err) {
      handleApiResponse(err.response);
      dispatch({
        type: blogType.UPLOAD_IMAGE,
        payload: err.response,
      });
    }
  };
  const uploadBlog = async (userData) => {
    try {
      let newData = {
        author: sessionStorage.getItem("_uid"),
        ...userData,
      };
      const response = await services.createPost(newData);
      dispatch({
        type: blogType.UPLOAD_BLOG,
        payload: response,
      });
    } catch (err) {
      handleApiResponse(err.response);
      dispatch({
        type: blogType.UPLOAD_BLOG,
        payload: err.response,
      });
    }
  };
  const deleteBlog = async (id) => {
    try {
      const response = await services.deletePost(id);
      dispatch({
        type: blogType.DELETE_BLOG,
        payload: response,
      });
    } catch (err) {
      handleApiResponse(err.response);
      dispatch({
        type: blogType.DELETE_BLOG,
        payload: err.response,
      });
    }
  };
  const clearImgData = () => {
    let data = {
      data: [],
    };
    dispatch({
      type: blogType.UPLOAD_IMAGE,
      payload: data,
    });
  };
  const updatePost = async (id, data) => {
    try {
      let newData = {
        author: sessionStorage.getItem("_uid"),
        ...data,
      };
      const response = await services.updatePost(id, newData);

      dispatch({
        type: blogType.UPLOAD_BLOG,
        payload: response,
      });
    } catch (err) {
      handleApiResponse(err.response);
      dispatch({
        type: blogType.UPLOAD_BLOG,
        payload: err.response,
      });
    }
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
        registered_user,
        uploadBlog,
        upload_blog,
        delete_blog,
        deleteBlog,
        clearImgData,
        updated_posts,
        updatePost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
