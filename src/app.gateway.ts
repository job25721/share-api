import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

interface msgPayload {
  from: string;
  to: string;
  msg: any;
}

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() wss: Server;

  handleDisconnect(client: any) {
    this.logger.log(`disconnected client id : ${client.id}`);
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`connected client id : ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.log('Innit');
  }
  @SubscribeMessage('toServer')
  handleMessage(client: Socket, payload: msgPayload): void {
    console.log(payload);
    // return { event: 'toClient', data: payload };
    this.wss.emit('toClient', payload);
  }
}
