import React, { Component } from 'react';
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
class Favorites extends Component {
  state = {
    favorites: [],
    post: {},
    modalViewVisible: false,
    idUser: '',
  };

  async componentDidMount() {
    this.getFavorites();
    this.getIdUser();
  }

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
    const { favorites, modalViewVisible, post, idUser } = this.state;
    const { navigation } = this.props;
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

export default Favorites;

Favorites.propTypes = {
  navigation: PropTypes.object.isRequired,
  addListener: PropTypes.func.isRequired,
};
