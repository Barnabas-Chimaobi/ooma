import React from 'react';
import {render} from '@testing-library/react-native';
import Card from './index';

describe('Hello', () => {
  it('renders the correct message', () => {
    const {queryByText} = render(
      <Card
        ratingCount={4}
        labelText="Up to -15% off"
        img={require('../../assets/Images/ib.png')}
        title="{item.title}"
        rating={3}
        dish1="{item.dish1}"
        dish2="{item.dish2}"
        dish3="item.dish3}"
        price={4000}
      />,
    );
    expect(queryByText('Up to -15% off')).not.toBeNull();
  });
});
