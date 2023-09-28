import { createContext, useReducer } from "react";
import blogReducer, { INITIAL_STATE } from "./BlogReducer";
import blogType from "./BlogType";
import ApiServices from "../services/apiServices";
import axiosInstance from "@/shared/apiConstants";
import config from "@/shared/config";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import AWS from "aws-sdk";

const AWS_ACCESS_KEY = config.REACT_APP_AWS_ACCESS_KEY;
const AWS_SECRET_KEY = config.REACT_APP_AWS_SECRET_KEY;
const AWS_REGION = config.REACT_APP_AWS_REGION;
const S3_BUCKET_NAME = config.REACT_APP_S3_BUCKET_NAME;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION,
});

const services = new ApiServices();
export const BlogContext = createContext({
  ...INITIAL_STATE,
});

const BlogProvider = ({ children }) => {
  const router = useRouter();
  const tokenRef = useRef();
  useEffect(() => {
    axiosInstance.interceptors.request.use((config) => {
      if (tokenRef.current) {
        config.headers.Authorization = `Bearer ${tokenRef.current}`;
      }
      return config;
    });
  }, []); // Empty dependency array ensures this runs only once
  const handleApiResponse = (response) => {
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
      await dispatchUserEntry(response);
      dispatch({
        type: blogType.FETCH_LOGIN_DETAILS,
        payload: response,
      });
      return response;
    } catch (err) {
      console.log(err.response, "err in login");
      dispatch({
        type: blogType.FETCH_LOGIN_DETAILS,
        payload: err.response,
      });
    }
  };
  const clearPostsHandler = () => {
    dispatch({
      type: blogType.CLEAR_POSTS,
      payload: { data: [] },
    });
  };
  const fetchAllPosts = async (page, search, tags) => {
    try {
      const response = await services.posts(page, search, tags);
      const tagRes = await services.getTags();
      if (page === 1) {
        clearPostsHandler();
      }
      dispatch({
        type: blogType.FETCH_TAGS,
        payload: tagRes,
      });
      dispatch({
        type: blogType.FETCH_ALL_POSTS,
        payload: response.data,
      });
      return response;
    } catch (err) {
      console.log(err.response, "err in fetch posts");
      handleApiResponse(err.response);
      dispatch({
        type: blogType.FETCH_ALL_POSTS,
        payload: err.response,
      });
    }
  };

  // const searchPosts = async (page, search, tags) => {
  //   try {
  //   } catch (err) {}
  // };

  // const filterByTags = async (page, tags, search) => {
  //   try {
  //   } catch (err) {}
  // };

  const registerUser = async (payload) => {
    try {
      const response = await services.register(payload);
      dispatch({
        type: blogType.FETCH_LOGIN_DETAILS,
        payload: response,
      });
    } catch (err) {
      console.log(err.response, "err in register");
      dispatch({
        type: blogType.FETCH_LOGIN_DETAILS,
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
      console.log(err.response, "err in fetch blog details");
      handleApiResponse(err.response);
      dispatch({
        type: blogType.FETCH_BLOG_DETAILS,
        payload: err.response,
      });
    }
  };

  const dispatchUserEntry = async (response) => {
    tokenRef.current = response.data.token;
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("_uid", response.data.user._id);

    return dispatch({
      type: blogType.FETCH_LOGIN_DETAILS,
      payload: response,
    });
  };

  const uploadImage = async (base64, type, name) => {
    try {
      const buffer = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const path = `${sessionStorage.getItem("_uid")}/${name}`;

      const response = await uploadToS3(S3_BUCKET_NAME, path, buffer, type);

      dispatch({
        type: blogType.UPLOAD_IMAGE,
        payload: response,
      });
    } catch (err) {
      console.log(err, "err in upload image to S3");
      dispatch({
        type: blogType.UPLOAD_IMAGE,
        payload: err,
      });
    }
  };

  const uploadToS3 = async (bucket, path, buffer, contentType) => {
    const s3bucket = new AWS.S3({ params: { Bucket: bucket } });
    const uploadParams = {
      Bucket: bucket,
      Key: path,
      Body: buffer,
      ContentType: contentType,
    };

    return s3bucket.upload(uploadParams).promise();
  };

  const uploadBlog = async (userData) => {
    //Best way to upload is by getting signature api and uploading from backend instead of exposing credentials in FE.
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
      console.log(err.response, "err in upload blog");
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
      console.log(err.response, "err in delete blog");
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
      console.log(err.response, "err in update blog");
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
        clearImgData,
        deleteBlog,
        fetchLoginDetails,
        fetchBlogDetails,
        fetchAllPosts,
        registerUser,
        uploadImage,
        uploadBlog,
        updatePost,
        login_details,
        posts,
        blog_details,
        img_data,
        tags,
        registered_user,
        upload_blog,
        delete_blog,
        updated_posts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
