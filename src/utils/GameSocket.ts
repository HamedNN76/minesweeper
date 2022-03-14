import {config} from '../config';

class GameSocket {
  private static _socket: WebSocket;
  private static _url: string;

  public static get socket() {
    return this._socket;
  }

  public static set socket(socketConnection: WebSocket) {
    this._socket = socketConnection;
  }

  public static get url() {
    return this._url;
  }

  public static set url(websocketUrl: string) {
    this._url = websocketUrl;
  }

  public static createConnection(url = config.websocket) {
    if (GameSocket.socket) {
      return GameSocket.socket;
    }
    GameSocket.socket = new WebSocket(url);
    GameSocket.url = url;
    return GameSocket.socket;
  }

  public static reconnectSocket() {
    GameSocket.socket = new WebSocket(this.url);
    return GameSocket.socket;
  }
}

export {GameSocket};
