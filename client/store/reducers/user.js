import { HYDRATE } from "next-redux-wrapper";
import { LOGIN, SIGNUP, LOGOUT } from "../names";
// serializer
import { userSerializer } from "serializer";

const initialState = {
  isLoggedIn: false,
  username: "",
  avatar: "",
  token: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        ...userSerializer(action.payload),
      };
    }
    case SIGNUP: {
      return {
        ...state,
        isLoggedIn: true,
        ...userSerializer(action.payload),
      };
    }
    case LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
