import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Button,
  View,
  Modal,
  TextInput,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import Articles from './components/articles';

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
});

export default class App extends React.Component {
  state = {
    button: 'Ajouter un article',
    modalVisible: false,
    url: '',
    posts: [],
  };

  componentDidMount() {
    axios.get('http://192.168.1.14:3000/posts').then(results => {
      this.setState({
        posts: results.data,
      });
    });
  }

  deleteArticle = id => {
    const { posts } = this.state;
    axios.delete(`http://192.168.1.14:3000/posts/${id}`).then(() => {
      this.setState({
        posts: posts.filter(post => post.id !== id),
      });
    });
  };

  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }

  validateUrl() {
    const { url } = this.state;
    const data = {
      title: url,
      description: 'description',
    };
    axios.post('http://192.168.1.14:3000/posts', data).then(post => {
      const { posts } = this.state;
      this.setState({
        modalVisible: false,
        posts: [...posts, post.data],
      });
    });
  }

  render() {
    const { button, modalVisible, url, posts } = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.h1}>Sharticles</Text>
          {/* eslint-disable-next-line global-require */}
          <Image source={require('./assets/share.png')} style={styles.logo} />
          <Button onPress={() => this.toggleModal(true)} title={button} />
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={styles.modal}>
              <View style={styles.closeModal}>
                <Button
                  onPress={() => {
                    this.toggleModal(!modalVisible);
                  }}
                  title="X"
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter URL"
                onChangeText={value => this.setState({ url: value })}
                value={url}
              />
              <Button title="ok" onPress={() => this.validateUrl()} />
            </View>
          </Modal>
          <View style={styles.line} />
          {posts.length !== 0 ? (
            <Articles posts={posts} deleteArticle={this.deleteArticle} />
          ) : (
            <Text>Aucun article</Text>
          )}
        </View>
      </ScrollView>
    );
  }
}
