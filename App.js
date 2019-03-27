import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  Modal,
  TextInput,
  Text,
  Image,
} from 'react-native';

import Articles from './articles';

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
    text: '',
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { button, modalVisible, text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>Sharticles</Text>
        <Image source={require('./share.png')} style={styles.logo} />
        <Button onPress={() => this.setModalVisible(true)} title={button} />
        <Modal animationType="slide" transparent={false} visible={modalVisible}>
          <View style={styles.modal}>
            <View style={styles.closeModal}>
              <Button
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
                title="X"
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter URL"
              onChangeText={value => this.setState({ text: value })}
              value={text}
            />
          </View>
        </Modal>
        <View style={styles.line} />
        <Articles />
      </View>
    );
  }
}
