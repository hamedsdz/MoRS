import { HYDRATE } from "next-redux-wrapper";
import { SET_MOVIE_ID, SET_MOVIE_DATA, RESET } from "../names";
// serializer
import { movieSerializer } from "serializer";

const initialState = {
  movieId: null,
  movie: null,
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_MOVIE_ID: {
      return {
        ...state,
        movieId: action.payload,
      };
    }
    case SET_MOVIE_DATA: {
      return {
        ...state,
        movie: { ...movieSerializer(action.payload) },
      };
    }
    case RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default order;
