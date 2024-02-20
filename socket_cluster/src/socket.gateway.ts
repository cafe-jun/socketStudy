import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  transports: ['polling', 'websocket'],
  namespace: 'event',
})
export class SocketGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    console.log(`${SocketGateway.name} Server init `);
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log(client.id);
  }
  handleDisconnect(client: Socket) {
    console.log(client.id);
  }
  @SubscribeMessage('test')
  async test(@ConnectedSocket() client: Socket) {
    console.log(client['id']);
    return 'test';
  }
}
