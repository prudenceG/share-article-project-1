import React from 'react';
import { shallow } from 'enzyme';
// with shallow we test only the component and not his children
// mock permet de tester son environnement sans lancer le fetch par exemple
import { Button, Alert } from 'react-native';

import App from './App';

describe('button', () => {
  it('button exists with text "ajouter un article"', () => {
    const button = shallow(<App />);
    expect(button.find(Button).props().title).toEqual('Ajouter un article');
  });
  it('alert is displayed when we click on the button', () => {
    const buttonClick = shallow(<App />);
    Alert.alert = jest.fn();
    buttonClick.find(Button).simulate('Press');
    expect(Alert.alert).toHaveBeenCalledWith('Touché!');
  });
});

// describe('App', () => {
//   it('renders View', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.find(View)).toHaveLength(1);
//   });
// });

// describe('within View', () => {
//   it('renders Text with text "Aucun article"', () => {
//     const text = shallow(<App />);
//     expect(
//       text
//         .find(Text)
//         .childAt(0)
//         .text()
//     ).toEqual('Aucun article !');
//   });
// });
