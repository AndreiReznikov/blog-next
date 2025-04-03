import { io } from 'socket.io-client';
import { BACKEND_URL } from '@/lib/Constants';

class SocketService {
  static instance;
  socket;

  constructor() {
    this.socket = io(BACKEND_URL);
    this.setupConnection();
  }

  static getInstance() {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  setupConnection() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }
}

export const socketService = SocketService.getInstance();