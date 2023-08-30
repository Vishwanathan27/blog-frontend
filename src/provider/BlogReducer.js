import blogType from "./BlogType";

export const INITIAL_STATE = {
  posts: [],
  login_details: {},
  blog_details: {},
  img_data: {},
  tags: [],
};

const blogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case blogType.FETCH_ALL_POSTS:
      return {
        ...state,
        posts: action.payload.data,
      };
    case blogType.FETCH_LOGIN_DETAILS:
      return {
        ...state,
        login_details: action?.payload?.data,
      };
    case blogType.FETCH_BLOG_DETAILS: {
      return {
        ...state,
        blog_details: action.payload.data,
      };
    }
    case blogType.UPLOAD_IMAGE: {
      return {
        ...state,
        img_data: action.payload.data,
      };
    }

    case blogType.FETCH_TAGS: {
      return {
        ...state,
        tags: action.payload.data.data[0].tags,
      };
    }
  }
};

export default blogReducer;
