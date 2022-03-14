import React from 'react';
import renderer from 'react-test-renderer';
import {Game} from './Game';
import {mount} from 'enzyme';
import {cleanup} from '@testing-library/react';

describe('<Game />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('Match Game to SnapShot', () => {
    const gameMap: string[] = [];
    const tree = renderer
        .create(
            <Game gameMap={gameMap}/>,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should find cell 1-1', () => {
    const gameMap: string[] = [
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
    ];
    const wrapper = mount(
        <Game gameMap={gameMap}/>,
    );
    const element = wrapper.find('square-1-1');
    expect(element).toBeTruthy();
  });
});
