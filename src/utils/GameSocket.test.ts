import {GameSocket} from './GameSocket';
import {config} from '../config';

describe('GameSocket', () => {
  it('Should be defined', () => {
    expect(GameSocket).toBeDefined();
  });
  it('Should not connect to websocket with invalid url', () => {
    const url = 'An_Invalid_Url';

    function createConnection() {
      GameSocket.createConnection(url);
    }

    expect(createConnection).toThrow(new Error(`The URL '${url}' is invalid.`));
  });
  it('Should create connection and return the created websocket', () => {
    const socket = GameSocket.createConnection();
    expect(socket).toBe(GameSocket.socket);
  });
  it('Should store url after connection', () => {
    const socket = GameSocket.createConnection();
    expect(socket.url).toBe(config.websocket);
  });
  it('Should not create a new connection when there is an open one', () => {
    const socket = GameSocket.createConnection();
    expect(socket).toBe(GameSocket.socket);
  });
  it('Should return new websocket on reconnection', () => {
    const socket = GameSocket.reconnectSocket();
    expect(socket).toBe(GameSocket.socket);
  });
});
