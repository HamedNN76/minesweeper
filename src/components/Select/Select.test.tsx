import {cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import {Select} from './Select';
import React from 'react';
import {mount} from 'enzyme';

describe('<Select>', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('Match SelectBox to SnapShot', () => {
    const data = [{name: '1', value: '1'}];
    const tree = renderer
      .create(<Select data={data} value="1" label="Test" onChange={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should return {} if data is an empty array', () => {
    const wrapper = mount(<Select data={[]} value="1" label="Test" onChange={() => {}} />);
    expect(wrapper).toEqual({});
  });
});
