// import { io } from "socket.io-client";
import * as uuid from "uuid";

// Import from utils
import { BrowserStorageUtils } from "src/utils/browser_storage";

// Import types
// import type { Socket } from "socket.io-client";
import type { SocketMessage } from "./types";

let _: SocketClient | null = null;

export class SocketClient {
  private _socketId!: string;
  private _instance!: WebSocket;
  private _listeners!: Map<string, Function>;

  constructor() {
    if (_) return _;

    if (BrowserStorageUtils.getItem<string>("socket_id") === null) {
      this._socketId = "web-" + uuid.v4();
      BrowserStorageUtils.setItem("socket_id", this._socketId);
    } else {
      this._socketId = BrowserStorageUtils.getItem<string>("socket_id")!;
    }

    // this._instance = io(`${import.meta.env.VITE_SOCKET_ENDPOINT}`, {
    //   path: `/ws/${this._socketId}`,
    // });

    const fullURL = `${import.meta.env.VITE_SOCKET_ENDPOINT}/ws/${
      this._socketId
    }`;

    this._instance = new WebSocket(fullURL);
    this._listeners = new Map();

    _ = this;

    // Setup base event of websocket
    this._instance.onmessage = function (event) {
      try {
        let data = JSON.parse(event.data) as SocketMessage;
        let listener = _?._listeners.get(data.type);

        if (listener) {
          listener(data.data);
        }
      } catch (error: any) {
        if ((error.message as string).startsWith("Error: Unexpected token")) {
          console.log("Invalid event");
        }
      }
    };
  }

  /**
   * Listen an event on websocket. Require name of event and a listener
   * @param name
   * @param fn
   */
  listen<Payload = any>(name: string, fn: (data: Payload) => any) {
    if (this._listeners.get(name)) return;

    this._listeners.set(name, fn);
  }

  /**
   * Unlisten an `name` event
   * @param name
   */
  unlisten(name: string) {
    if (!this._listeners.get(name)) return;

    this._listeners.delete(name);
  }

  /**
   * Emit an event to
   * @param name
   * @param data
   */
  emit<Payload = any>(name: string, data: Payload) {
    if (this._instance.readyState === this._instance.CONNECTING) return;
    this._instance.send(JSON.stringify({ type: name, data }));
  }
}
