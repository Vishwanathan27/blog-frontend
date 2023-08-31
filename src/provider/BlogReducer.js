import blogType from "./BlogType";

export const INITIAL_STATE = {
  posts: [],
  login_details: {},
  blog_details: {},
  img_data: {},
  tags: [],
  registered_user: {},
  upload_blog: {},
  delete_blog: {},
  updated_posts: {},
};

const blogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case blogType.FETCH_ALL_POSTS:
      return {
        ...state,
        posts: action.payload?.data,
      };
    case blogType.FETCH_LOGIN_DETAILS:
      return {
        ...state,
        login_details: action?.payload?.data,
      };
    case blogType.FETCH_BLOG_DETAILS: {
      return {
        ...state,
        blog_details: action.payload?.data,
      };
    }
    case blogType.UPLOAD_IMAGE: {
      return {
        ...state,
        img_data: action.payload,
      };
    }

    case blogType.FETCH_TAGS: {
      return {
        ...state,
        tags: action.payload?.data?.data[0].tags,
      };
    }
    case blogType.REGISTER_USER: {
      return {
        ...state,
        registered_user: action.payload?.data,
      };
    }
    case blogType.UPLOAD_BLOG: {
      return {
        ...state,
        upload_blog: action.payload?.data,
      };
    }
    case blogType.DELETE_BLOG: {
      return {
        ...state,
        delete_blog: action.payload?.data,
      };
    }
    case blogType.UPDATE_POSTS: {
      return {
        ...state,
        updated_posts: action.payload?.data,
      };
    }
    default:
      return state;
  }
};

export default blogReducer;
