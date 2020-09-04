/* eslint-disable react/prop-types */
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Home from './home';
import Favorites from './favorites';

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#f4c741',
  },
  iconTab: {
    marginTop: 10,
  },
});

export const Tabs = createBottomTabNavigator({
  Accueil: {
    screen: Home,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeTintColor: 'white',
        inactiveTintColor: '#b79f56',
        style: styles.tab,
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="home"
          size={35}
          color={tintColor}
          iconStyle={styles.iconTab}
        />
      ),
    },
  },
  'Mes Favoris': {
    screen: Favorites,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        activeTintColor: 'white',
        inactiveTintColor: '#b79f56',
        style: styles.tab,
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="star"
          size={35}
          color={tintColor}
          iconStyle={styles.iconTab}
        />
      ),
    },
  },
});

export default createAppContainer(Tabs);
