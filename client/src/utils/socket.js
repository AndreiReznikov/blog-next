import { io } from 'socket.io-client';
import { BACKEND_URL } from '@/lib/Constants';

class SocketService {
  static instance;
  socket;

  constructor() {
    this.socket = io(BACKEND_URL);
  }

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }
}

export const socketService = SocketService.getInstance();