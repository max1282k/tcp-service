import { Injectable } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpService {
  start() {
    const server = net.createServer((socket) => {
      // Handle incoming connections
      console.log('Client connected');

      socket.on('data', (data) => {
        console.log('Received:', data.toString());
        // You can process the received data here
      });

      socket.on('end', () => {
        console.log('Client disconnected');
      });

      socket.on('error', (err) => {
        console.error('Socket error:', err);
      });
    });

    server.listen(3000, () => {
      console.log('TCP server is listening on port 3000');
    });
  }
}
