import { shallow } from 'enzyme';
import React from 'react';
import App from '../components/App';

describe('A basic React boilerplate header example', () => {
  const wrapper = shallow(<App />);
  it('should have an existing App component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
