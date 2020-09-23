import { FETCH_ARTICLES__RESOLVE } from '../actions/fetchArticles';

const articlesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLES__RESOLVE:
      return [...action.articles];
    default:
      return state;
  }
};

export default articlesReducer;
