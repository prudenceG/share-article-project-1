import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import Articles from './components/articles';
import ModalTextfield from './components/modalTextfield';
import ModalView from './components/modalView';

const IP = '192.168.1.232';
const PORT = 3000;
const URL = `http://${IP}:${PORT}`;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  closeModal: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  modal: {
    backgroundColor: '#7addff',
    height: '100%',
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    height: 50,
    borderRadius: 8,
    borderColor: 'transparent',
    borderWidth: 1,
    width: '100%',
    margin: 'auto',
    backgroundColor: 'white',
    padding: 7,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
    marginTop: 20,
    marginBottom: 20,
  },
  h1: {
    fontSize: 30,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  bloc_image: {
    backgroundColor: 'grey',
  },
  image: {
    width: '100%',
    minHeight: 150,
  },
});

export default class App extends React.Component {
  state = {
    button: 'Ajouter un article',
    modalVisible: false,
    url: '',
    posts: [],
    post: {},
    currentPost: [],
    modalViewVisible: false,
  };

  componentDidMount() {
    axios.get(`${URL}/posts`).then(results => {
      this.setState({
        posts: results.data,
      });
    });
  }

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

  validateUrl = () => {
    const { url, posts } = this.state;
    axios.post(`${URL}/posts`, { url }).then(post => {
      this.setState({
        modalVisible: false,
        posts: [...posts, post.data],
        currentPost: [],
      });
    });
  };

  render() {
    const {
      button,
      modalVisible,
      url,
      posts,
      post,
      currentPost,
      modalViewVisible,
    } = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.h1}>Sharticles</Text>
          {/* eslint-disable-next-line global-require */}
          <Image source={require('./assets/share.png')} style={styles.logo} />
          <Button onPress={() => this.toggleModal(true)} title={button} />

          <View style={styles.line} />
          {posts.length !== 0 ? (
            <Articles
              posts={posts}
              modalViewVisible={modalViewVisible}
              toggleModalView={this.toggleModalView}
            />
          ) : (
            <Text>Aucun article</Text>
          )}
        </View>
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
        />
      </ScrollView>
    );
  }
}
