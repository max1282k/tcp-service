import { Injectable } from '@nestjs/common';
import * as net from 'net';
import { PacketBuffer } from './packet-buffer.service'; // Import PacketBuffer service

@Injectable()
export class TcpService {
  constructor(private readonly packetBuffer: PacketBuffer) {} // Inject PacketBuffer service

  start() {
    const server = net.createServer((socket) => {
      console.log('Client connected');
      socket.on('data', (data) => {
        console.log('Received:', data.toString());
        const result = this.packetBuffer.handleData(data);
        if (result !== null) {
          const { latitude, longitude } = result;
          console.log('Latitude:', latitude, 'Longitude:', longitude);
          socket.write('#ASD#1\r\n');
        } else {
          console.log('Invalid packet');
          socket.write('#ASD#-1\r\n');
        }
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
