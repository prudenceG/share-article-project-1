import { FETCH_ARTICLES__ERROR } from '../actions/fetchArticles';
import {
  AUTHENTICATION_VISIBLE,
  AUTHENTICATION_HIDDEN,
} from '../actions/authenticationVisible';

const authenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLES__ERROR:
      return action.authentication;
    case AUTHENTICATION_VISIBLE:
      return action.authentication;
    case AUTHENTICATION_HIDDEN:
      return action.authentication;
    default:
      return state;
  }
};

export default authenticationReducer;
