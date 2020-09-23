/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Modal,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { URL } from '../constants';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

class Authentication extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (event, type) => {
    this.setState({
      [type]: event,
    });
  };

  setStorage = async (token, key) => {
    await AsyncStorage.setItem(`${key}`, `${token}`);
  };

  handleConnect = () => {
    const { email, password } = this.state;
    const { toggleModalAuth, successfulConnexion, getIdUser } = this.props;
    const data = {
      email,
      password,
    };

    axios
      .post(`${URL}/login`, data)
      .then(async token => {
        await this.setStorage(token.data.token, 'token');
        await this.setStorage(token.data.id, 'idUser');
        getIdUser();
        successfulConnexion(true);
        toggleModalAuth(false);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  render() {
    const { authentication } = this.props;
    const { email, password } = this.state;

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={authentication}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="email"
            onChangeText={email => this.handleChange(email, 'email')}
            value={email}
          />
          <TextInput
            placeholder="password"
            onChangeText={password => this.handleChange(password, 'password')}
            value={password}
          />
          <Button title="Se connecter" onPress={() => this.handleConnect()} />
        </View>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(Authentication);
