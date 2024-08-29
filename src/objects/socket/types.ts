export type SocketMessage<Payload = any> = {
  type: string;
  data: Payload;
};
