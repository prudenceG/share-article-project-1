import React from 'react';
import {
  View,
  Modal,
  Image,
  Button,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  containerArticle: {
    display: 'flex',
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: 'white',
  },
  bloc_image: {
    backgroundColor: 'grey',
  },
  image: {
    width: '100%',
    minHeight: 150,
  },
  blocText: {
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#ef5023',
    fontSize: 18,
  },
  closeView: {
    marginTop: 60,
  },
});
const ModalView = props => {
  const { modalViewVisible, toggleModalView, post, deleteArticle } = props;
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalViewVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={styles.closeView}>
          <Button
            onPress={() => toggleModalView(!modalViewVisible, post)}
            title="X"
          />
        </View>
        <View style={styles.containerArticle}>
          <View style={styles.bloc_image}>
            <Image
              style={styles.image}
              source={{ uri: post.imageURL }}
              alt={post.title}
            />
          </View>
          <View style={styles.blocText}>
            <Text style={[styles.text, styles.title]}>{post.title}</Text>
            <Text style={styles.text}>{post.description}</Text>
          </View>
        </View>
        <Button
          onPress={() => deleteArticle(post.id, !modalViewVisible)}
          title="Supprimer"
        />
        <Button title="Voir l'article" />
        <Button title="Ajouter aux favoris" />
      </Modal>
    </View>
  );
};

ModalView.propTypes = {
  modalViewVisible: PropTypes.bool.isRequired,
  toggleModalView: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

export default ModalView;
