// packet-buffer.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class PacketBuffer {
  private buffer: string;

  constructor() {
    this.buffer = '';
  }

  handleData(data: Buffer): any {
    this.buffer += data.toString();
    let packet = this.extractPacket();

    while (packet) {
      if (this.isSDPacket(packet)) {
        const latLong = this.extractLatLong(packet);
        // Remove parsed packet from buffer
        this.buffer = this.buffer.slice(packet.length);
        return latLong;
      }
      // If the packet is not an SD packet, remove it from the buffer and continue searching
      this.buffer = this.buffer.slice(packet.length);
      packet = this.extractPacket();
    }

    return null;
  }

  extractPacket(): string | null {
    const startDelimiterIndex = this.buffer.indexOf('#');
    const endDelimiterIndex = this.buffer.indexOf('\r\n');

    if (startDelimiterIndex !== -1 && endDelimiterIndex !== -1) {
      return this.buffer.slice(startDelimiterIndex, endDelimiterIndex + 2);
    } else {
      return null;
    }
  }

  isSDPacket(packet: string): boolean {
    return packet.startsWith('#SD#');
  }

  extractLatLong(packet: string): { latitude: number; longitude: number } {
    const parts = packet.split(';');
    const latitude = this.parseCoordinate(parts[2], parts[3]);
    const longitude = this.parseCoordinate(parts[4], parts[5]);
    return { latitude, longitude };
  }

  parseCoordinate(coordinate: string, direction: string): number {
    const degrees = parseInt(coordinate.slice(0, -8));
    const minutes = parseFloat(coordinate.slice(-8));
    const sign = direction === 'N' || direction === 'E' ? 1 : -1;
    console.log(sign);
    return sign * (degrees + minutes / 60);
  }
}
