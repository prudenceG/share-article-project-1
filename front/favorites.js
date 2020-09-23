import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Linking,
} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import Articles from './components/articles';
import ModalView from './components/modalView';
import { URL } from './constants';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
  },
});

const mapStateToProps = state => {
  return {
    posts: state.posts,
  };
};

class Favorites extends Component {
  state = {
    favorites: [],
    favoritesId: [],
    post: {},
    filteredPosts: [],
    modalViewVisible: false,
    idUser: '',
  };

  async componentDidMount() {
    this.getFavorites();
    this.getFavoritesId();
    this.getIdUser();
    this.filterPosts();
  }

  filterPosts = async () => {
    const favoritesId = await this.getFavoritesId();
    const { posts } = this.props;
    const allPosts = posts
      .map(post => {
        const postAsFavorite = favoritesId.find(
          favoriteId => favoriteId === post.id
        );

        if (!postAsFavorite) {
          return post;
        }

        return undefined;
      })
      .filter(post => post !== undefined);
    this.setState({
      filteredPosts: allPosts,
    });
  };

  getFavoritesId = async () => {
    const favoritesId = await AsyncStorage.getItem('favoritesId');
    const userFavoritesId = await JSON.parse(favoritesId);

    this.setState({
      favoritesId: userFavoritesId,
    });

    return userFavoritesId;
  };

  getFavorites = async () => {
    const favoris = await AsyncStorage.getItem('favorites');
    const userFavorites = await JSON.parse(favoris);

    this.setState({
      favorites: userFavorites,
    });
  };

  toggleModalView = (visible, post) => {
    this.setState({
      post,
      modalViewVisible: visible,
    });
  };

  handleClickOpenUrl = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  deleteToFavorites = async postId => {
    const token = await AsyncStorage.getItem('token');
    axios
      .delete(`${URL}/favorites/${postId}`, {
        headers: { Autorization: `Bearer ${token}` },
      })
      .then(async newFavorites => {
        const userNewFavorites = JSON.stringify(newFavorites.data.allFavorites);
        await AsyncStorage.setItem('favorites', userNewFavorites);
        const userNewFavoritesId = JSON.stringify(
          newFavorites.data.newFavorites
        );
        await AsyncStorage.setItem('favoritesId', userNewFavoritesId);
        this.setState({
          favorites: newFavorites.data.allFavorites,
          modalViewVisible: false,
        });
      });
  };

  getIdUser = async () => {
    const idUser = await AsyncStorage.getItem('idUser');
    this.setState({
      idUser,
    });
  };

  render() {
    const {
      favorites,
      modalViewVisible,
      post,
      idUser,
      favoritesId,
      filteredPosts,
    } = this.state;
    const { navigation, posts } = this.props;

    navigation.addListener('didFocus', () => {
      this.getFavorites();
    });

    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.title}>Mes Favoris</Text>
          {favorites.length !== 0 ? (
            <Articles
              posts={favorites}
              toggleModalView={this.toggleModalView}
              modalViewVisible={modalViewVisible}
              idUser={idUser}
            />
          ) : (
            <Text>Aucun Favoris</Text>
          )}
          <Text style={styles.title}>
            Ces articles pourraient vous intéresser
          </Text>
          {posts.length !== 0 ? (
            <Articles
              posts={filteredPosts}
              modalViewVisible={modalViewVisible}
              toggleModalView={this.toggleModalView}
              favoritesId={favoritesId}
              idUser={idUser}
            />
          ) : (
            <Text>Aucun article</Text>
          )}
        </View>

        <ModalView
          modalViewVisible={modalViewVisible}
          toggleModalView={this.toggleModalView}
          post={post}
          handleClickOpenUrl={this.handleClickOpenUrl}
          favorites={favorites}
          deleteToFavorites={this.deleteToFavorites}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Favorites);

Favorites.propTypes = {
  navigation: PropTypes.object.isRequired,
  addListener: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};
