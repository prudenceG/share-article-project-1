import axios from 'axios';

import { AsyncStorage } from 'react-native';
import { URL } from '../../constants';

export const FETCH_ARTICLES__BEGIN = 'FETCH_ARTICLES__BEGIN';
export const FETCH_ARTICLES__RESOLVE = 'FETCH_ARTICLES__RESOLVE';
export const FETCH_ARTICLES__ERROR = 'FETCH_ARTICLES__ERROR';

export const fetchArticles = dispatch => async () => {
  dispatch({
    type: FETCH_ARTICLES__BEGIN,
  });

  const token = await AsyncStorage.getItem('token');
  const id = await AsyncStorage.getItem('idUser');

  try {
    const response = await axios({
      method: 'GET',
      url: `${URL}/posts/${id}`,
      headers: {
        Autorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: FETCH_ARTICLES__RESOLVE,
      articles: response.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_ARTICLES__ERROR,
      authentication: true,
    });
  }
};
