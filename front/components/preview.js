/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bloc_image: {
    backgroundColor: 'grey',
  },
  image: {
    width: '100%',
    minHeight: 150,
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
  closeView: {
    marginTop: 60,
  },
});

const Preview = props => {
  const { currentPosts } = props;
  return (
    <View>
      {currentPosts &&
        currentPosts.map(post => (
          <View key={post.id} style={styles.container}>
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
          </View>
        ))}
    </View>
  );
};

export default Preview;
