/* eslint-disable global-require */
import React from 'react';
import axios from 'axios';
import {
  AsyncStorage,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Articles from './components/articles';
import ModalTextfield from './components/modalTextfield';
import ModalView from './components/modalView';
import Authentication from './components/authentication';
import { URL } from './constants';
import { fetchArticles } from './store/actions/fetchArticles';
import {
  authenticationViewHidden,
  authenticationViewVisible,
} from './store/actions/authenticationVisible';

const styles = StyleSheet.create({
  scroll_view: {
    padding: 20,
  },
  container: {
    marginTop: 40,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  right_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  left_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bloc_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  h1: {
    fontSize: 30,
    height: 30,
    marginBottom: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
  },
  add_button: {
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  add_text: {
    marginLeft: 3,
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgb(230, 230, 230)',
    marginTop: 5,
    marginBottom: 20,
  },
});

const mapStateToProps = state => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchFetchArticles: () => dispatch(fetchArticles(dispatch)),
    dispatchAuthenticationViewVisible: () =>
      dispatch(authenticationViewVisible()),
    dispatchAuthenticationViewHidden: () =>
      dispatch(authenticationViewHidden()),
  };
};

class Home extends React.Component {
  state = {
    modalVisible: false,
    url: '',
    posts: [],
    post: {},
    currentPost: [],
    modalViewVisible: false,
    favorites: [],
    favoritesId: [],
    idUser: '',
  };

  async componentDidMount() {
    this.getPosts();
    this.getFavorites();
    this.getIdUser();
  }

  getPosts() {
    const { dispatchFetchArticles } = this.props;

    dispatchFetchArticles();
  }

  async getFavorites() {
    const token = await this.getStorage('token');
    const id = await this.getStorage('idUser');
    axios
      .get(`${URL}/favorites/${id}`, {
        headers: { Autorization: `Bearer ${token}` },
      })
      .then(async favorites => {
        const userFavorites = JSON.stringify(favorites.data.allFavorites);
        await this.setStorage('favorites', userFavorites);
        this.setState({
          favorites: favorites.data.allFavorites,
          favoritesId: favorites.data.favoritesId,
        });
      });
  }

  getStorage = async key => {
    const getData = await AsyncStorage.getItem(`${key}`);
    return getData;
  };

  setStorage = async (key, content) => {
    await AsyncStorage.setItem(`${key}`, `${content}`);
  };

  deleteArticle = (id, visible) => {
    const { posts } = this.state;
    axios.delete(`${URL}/posts/${id}`).then(() => {
      this.setState({
        modalViewVisible: visible,
        posts: posts.filter(post => post.id !== id),
      });
    });
  };

  toggleModal = visible => {
    this.setState({
      modalVisible: visible,
      currentPost: [],
    });
  };

  toggleModalView = (visible, post) => {
    this.setState({
      post,
      modalViewVisible: visible,
    });
  };

  toggleModalAuth = (visible = true) => {
    this.getPosts();

    const {
      dispatchAuthenticationViewVisible,
      dispatchAuthenticationViewHidden,
    } = this.props;

    return visible
      ? dispatchAuthenticationViewVisible()
      : dispatchAuthenticationViewHidden();
  };

  handleChange = url => {
    this.setState({
      url,
    });
    axios.post(`${URL}/post`, { url }).then(currentPost => {
      this.setState({
        currentPost: [{ ...currentPost.data, id: '123456' }],
      });
    });
  };

  validateUrl = async () => {
    const token = await this.getStorage('token');
    const id = await this.getStorage('idUser');
    const { url, posts } = this.state;

    axios
      .post(
        `${URL}/posts`,
        { url, id },
        {
          headers: {
            Autorization: `Bearer ${token}`,
          },
        }
      )
      .then(post => {
        this.setState({
          modalVisible: false,
          posts: [...posts, post.data],
          currentPost: [],
        });
      });
  };

  handleClickOpenUrl = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  addToFavorites = async postId => {
    const token = await this.getStorage('token');
    const userId = await this.getStorage('idUser');
    axios
      .post(
        `${URL}/post/favorite`,
        { postId, userId },
        {
          headers: {
            Autorization: `Bearer ${token}`,
          },
        }
      )
      .then(async () => {
        await this.getFavorites();
        const { favoritesId } = this.state;
        this.setState({
          modalViewVisible: false,
          favoritesId: [...favoritesId, postId],
        });
      })
      .catch(err => console.log(err.data));
  };

  deleteToFavorites = postId => {
    console.log('delete', postId);
  };

  deleteStorage = async () => {
    const { dispatchAuthenticationViewVisible } = this.props;

    await AsyncStorage.removeItem('idUser');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('favorites');

    dispatchAuthenticationViewVisible();
  };

  successfulConnexion = valid => {
    if (valid === true) {
      this.getPosts();
      this.getFavorites();
    }
  };

  getIdUser = async () => {
    const idUser = await AsyncStorage.getItem('idUser');
    this.setState({
      idUser,
    });
  };

  reloadFavorites = async () => {
    const reloadFavorites = await AsyncStorage.getItem('favorites');
    const favorites = JSON.parse(reloadFavorites);
    const reloadFavoritesId = await AsyncStorage.getItem('favoritesId');
    const favoritesId = JSON.parse(reloadFavoritesId);
    this.setState({
      favorites,
      favoritesId,
    });
  };

  render() {
    const {
      modalVisible,
      url,
      post,
      currentPost,
      modalViewVisible,
      favoritesId,
      favorites,
      idUser,
    } = this.state;
    const { navigation, posts } = this.props;

    navigation.addListener('didFocus', () => {
      this.reloadFavorites();
    });

    return (
      <ScrollView style={styles.scroll_view} keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <View style={styles.bloc_header}>
            <View style={styles.left_header}>
              <Image
                source={require('./assets/share.png')}
                style={styles.logo}
              />
              <Text style={styles.h1}>sharticles</Text>
            </View>
            <View style={styles.right_header}>
              <TouchableOpacity
                style={styles.add_button}
                onPress={() => this.toggleModal(true)}
              >
                <Icon name="add-circle" size={30} color="#ef5023" />
                <Text style={styles.add_text}>ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="menu"
                  size={30}
                  onPress={() => this.deleteStorage()}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line} />
        </View>
        <Text style={styles.title}>Tous les articles</Text>
        {posts.length !== 0 ? (
          <Articles
            posts={posts}
            modalViewVisible={modalViewVisible}
            toggleModalView={this.toggleModalView}
            favoritesId={favoritesId}
            idUser={idUser}
          />
        ) : (
          <Text>Aucun article</Text>
        )}
        <ModalTextfield
          currentPosts={currentPost}
          url={url}
          toggleModal={this.toggleModal}
          modalVisible={modalVisible}
          handleChange={this.handleChange}
          validateUrl={this.validateUrl}
        />
        <ModalView
          modalViewVisible={modalViewVisible}
          toggleModalView={this.toggleModalView}
          post={post}
          deleteArticle={this.deleteArticle}
          handleClickOpenUrl={this.handleClickOpenUrl}
          favorites={favorites}
          addToFavorites={this.addToFavorites}
          deleteToFavorites={this.deleteToFavorites}
        />
        <Authentication
          toggleModalAuth={this.toggleModalAuth}
          successfulConnexion={this.successfulConnexion}
          getIdUser={this.getIdUser}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
  addListener: PropTypes.func,
  dispatchFetchArticles: PropTypes.func.isRequired,
  dispatchAuthenticationViewVisible: PropTypes.func.isRequired,
  dispatchAuthenticationViewHidden: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

Home.defaultProps = {
  addListener: null,
};
