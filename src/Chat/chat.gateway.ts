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
import { ChatService } from './chat.service';

interface msgPayload {
  from: string;
  to: string;
  msg: any;
}

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  private logger: Logger = new Logger('ChatGateway');

  @WebSocketServer() wss: Server;

  handleDisconnect(client: any) {
    this.logger.log(`disconnected client id : ${client.id}`);
  }
  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`connected client id : ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }
  @SubscribeMessage('toServer')
  handleMessage(client: Socket, payload: msgPayload): void {
    console.log(payload);
    this.wss.emit('toClient', payload);
  }
}
