import blogType from "./BlogType";

export const INITIAL_STATE = {
  posts: [],
  login_details: {},
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
        login_details: action.payload.data,
      };
  }
};

export default blogReducer;
