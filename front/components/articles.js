/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  bloc_image: {
    backgroundColor: 'grey',
  },
  image: {
    width: '100%',
    minHeight: 150,
    zIndex: -1000,
  },
  container: {
    marginBottom: 10,
    marginTop: 10,
  },
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
  favorite: {
    position: 'absolute',
    right: 0,
    padding: 5,
    zIndex: 1000,
  },
});

const Article = props => {
  const {
    posts,
    modalViewVisible,
    toggleModalView,
    favoritesId,
    idUser,
  } = props;
  return (
    <View>
      {posts &&
        posts.map(post => (
          <TouchableOpacity
            key={post.id}
            onPress={() => toggleModalView(!modalViewVisible, post)}
          >
            <View style={styles.container}>
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
                  {idUser && idUser === post.idUser ? (
                    <Text>Article publié par: vous</Text>
                  ) : (
                    <Text>{`Article publié par: ${post.pseudoUser}`}</Text>
                  )}
                </View>
              </View>
              {favoritesId &&
              favoritesId.find(favorite => favorite === post.id) ? (
                <View style={styles.favorite}>
                  <Icon name="star" size={20} color="yellow" />
                </View>
              ) : (
                <Icon />
              )}
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default Article;
