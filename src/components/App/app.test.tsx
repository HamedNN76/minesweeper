import React from 'react';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';
import App from './app';
import {mount} from 'enzyme';
import {cleanup, render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import {watcherSaga} from '../../redux/game/gameSaga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('Should renders the app', () => {
    const initialState = {
      game: {
        map: [],
        message: '',
      },
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Should render start game', () => {
    const initialState = {
      game: {
        map: [],
        message: '',
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(wrapper.text().includes('Minesweeper')).toBe(true);
    expect(wrapper.text().includes('Play')).toBe(true);
  });
  it('Should render Play Again button', async () => {
    const initialState = {
      game: {
        map: [
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
        ],
        message: '',
      },
    };
    const store = mockStore(initialState);
    sagaMiddleware.run(watcherSaga);

    const app = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(app.getByText('Play again')).toBeTruthy();
  });
});
