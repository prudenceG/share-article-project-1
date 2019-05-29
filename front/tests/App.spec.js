import React from 'react';
import { shallow } from 'enzyme';
// with shallow we test only the component and not his children
// mock permet de tester son environnement sans lancer le fetch par exemple
import { Button } from 'react-native';

import App from '../home';

describe('button', () => {
  it('button exists with text "Ajouter un article"', () => {
    const button = shallow(<App />);
    expect(
      button
        .find(Button)
        .at(0)
        .props().title
    ).toEqual('Ajouter un article' || 'X');
  });
});
