import { Injectable } from '@nestjs/common';
import * as net from 'net';
const PacketBuffer = require('./helper/PacketBuffer');

@Injectable()
export class TcpService {
  private packetBuffer: any;
  constructor() {
    this.packetBuffer = new PacketBuffer();
  }
  start() {
    // Create server for port 3000
    const server = net.createServer((socket) => {
      console.log('Client connected');
      socket.on('data', (data) => {
        console.log('Received:', data.toString());
        const { latitude, longitude } = this.packetBuffer.handleData(data);
        if (latitude !== null && longitude !== null) {
          console.log('Latitude:', latitude, 'Longitude:', longitude);
          socket.write('#ASD#1\r\n');
        } else {
          console.log('invalid packet');

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
