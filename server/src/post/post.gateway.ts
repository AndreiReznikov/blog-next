import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class PostGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('comment')
  handleComment(
    @MessageBody()
    data: {
      articleId: string;
      comment: string;
      authorId: string;
      authorName: string;
    },
  ): void {
    this.server.emit(`article-${data.articleId}`, {
      comment: data.comment,
      authorId: data.authorId,
      authorName: data.authorName,
    });
  }
}
