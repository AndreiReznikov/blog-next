import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(
    postId: number,
    data: { comment: string; authorId: number; authorName: string },
  ) {
    this.server.emit(`article-${postId}`, data);
  }
}
