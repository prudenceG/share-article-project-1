/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '40%',
    height: 150,
    backgroundColor: 'gray',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  blocText: {
    width: '60%',
    padding: 10,
  },
  text: {
    fontSize: 18,
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    color: '#ef5023',
    fontSize: 20,
  },
});

const Article = props => {
  const { posts } = props;
  return (
    <View>
      {posts &&
        posts.map(post => (
          <View key={post.id} style={styles.container}>
            <Image style={styles.image} />
            <View style={styles.blocText}>
              <Text style={[styles.text, styles.title]}>{post.title}</Text>
              <Text style={styles.text}>{post.description}</Text>
            </View>
          </View>
        ))}
    </View>
  );
};

export default Article;
