import React from 'react';
import { StyleSheet, View, Button, Alert, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  state = {
    button: 'Ajouter un article',
  };

  handlePress = () => {
    Alert.alert('Touché!');
  };

  render() {
    const { button } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hello !</Text>
        <Button onPress={this.handlePress} title={button} />
      </View>
    );
  }
}
