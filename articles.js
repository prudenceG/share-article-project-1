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
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 5,
    width: '100%',
    backgroundColor: 'white',
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
  },
});
export default class Articles extends React.Component {
  state = {
    bla: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} />
        <View style={styles.blocText}>
          <Text style={[styles.text, styles.title]}>Titre de l'article</Text>
          <Text style={styles.text}>
            Ceci est un long texte et oui ... kldjlk kljdfk
          </Text>
        </View>
      </View>
    );
  }
}
