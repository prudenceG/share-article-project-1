import React from 'react';
import {
  View,
  Modal,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Preview from './preview';

const styles = StyleSheet.create({
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
});

const ModalTextfield = props => {
  const {
    currentPosts,
    url,
    toggleModal,
    modalVisible,
    handleChange,
    validateUrl,
  } = props;
  return (
    <View>
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
            <Button onPress={() => toggleModal(!modalVisible)} title="X" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter URL"
            // eslint-disable-next-line no-shadow
            onChangeText={url => handleChange(url)}
            value={url}
            clearTextOnFocus
          />
          {currentPosts.length !== 0 && url !== '' ? (
            <Preview {...props} />
          ) : (
            <Text>Aucun aperçu</Text>
          )}
          <Button title="Publier" onPress={() => validateUrl()} />
        </View>
      </Modal>
    </View>
  );
};

ModalTextfield.propTypes = {
  currentPosts: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  validateUrl: PropTypes.func.isRequired,
};

export default ModalTextfield;
