import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import articlesReducer from './reducers/articlesReducer';
import authenticationReducer from './reducers/authenticationReducer';

const reducer = combineReducers({
  posts: articlesReducer,
  authentication: authenticationReducer,
});

const initialState = {
  posts: [],
  authentication: false,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
