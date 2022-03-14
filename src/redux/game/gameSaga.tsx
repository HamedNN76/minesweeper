import {take, put, call, apply, fork, takeLatest} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {GameSocket} from '../../utils/GameSocket';
import {setMap, updateMessage, init, createGame} from './gameSlice';

function createSocketChannel(socket: WebSocket) {
  return eventChannel(emit => {
    const handleOnMessage = (event: WebSocketEventMap['message']) => {
      emit(event.data);
    };

    const errorHandler = (errorEvent: WebSocketEventMap['error']) => {
      emit(new Error(errorEvent.type || 'BAD_THING_HAPPENED'));
    };

    socket.addEventListener('message', handleOnMessage);
    socket.addEventListener('error', errorHandler);

    return () => socket.removeEventListener('message', handleOnMessage);
  });
}

function* getMap(socket: WebSocket) {
  yield apply(socket, socket.send, ['map']);
}

export function* handleCreateGame(action: any) {
  yield apply(GameSocket.socket, GameSocket.socket.send, [action.payload]);
}

export function* watchGame(): any {
  const socket: WebSocket = yield call(GameSocket.createConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  while (socket) {
    try {
      const data = yield take(socketChannel);
      if (data.includes('map:')) {
        yield put(setMap(data));
      } else if (data.includes('new:')) {
        yield fork(getMap, socket);
      } else if (data.includes('open:')) {
        yield put(updateMessage(data.split('open: ')[1]));
        yield fork(getMap, socket);
      } else {
        console.warn('Unhandled websocket message =>', data);
      }
    } catch (err) {
      console.error('socket error:', err);
      socketChannel.close();
      GameSocket.reconnectSocket();
      yield put(init());
    }
  }
}

export function* watcherSaga() {
  yield takeLatest(init.type, watchGame);
  yield takeLatest(createGame.type, handleCreateGame);
}
