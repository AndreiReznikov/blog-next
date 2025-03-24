import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // вынести
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(
    postId: number,
    data: {
      comment?: string;
      authorName?: string;
      type?: string;
    },
  ) {
    this.server.emit(`article-${postId}`, data);
  }
}
