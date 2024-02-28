class PacketBuffer {
  constructor() {
    this.buffer = '';
  }

  // Function to handle incoming data
  handleData(data) {
    this.buffer += data.toString(); // Append incoming data to buffer
    let packet = this.extractPacket(); // Try to extract a complete packet

    while (packet) {
      // Check if packet is of type SD
      if (this.isSDPacket(packet)) {
        // Extract latitude and longitude
        return this.extractLatLong(packet);
      }

      // Remove extracted packet from buffer
      this.buffer = this.buffer.slice(packet.length);
      packet = this.extractPacket(); // Try to extract next packet
    }

    return null; // No complete SD packet found
  }

  // Function to extract a complete packet from buffer
  extractPacket() {
    const startDelimiterIndex = this.buffer.indexOf('#');
    const endDelimiterIndex = this.buffer.indexOf('\r\n');

    if (startDelimiterIndex !== -1 && endDelimiterIndex !== -1) {
      // Return complete packet including delimiters
      return this.buffer.slice(startDelimiterIndex, endDelimiterIndex + 2);
    } else {
      return null; // Incomplete packet
    }
  }

  // Function to check if a packet is of type SD
  isSDPacket(packet) {
    return packet.startsWith('#SD#');
  }

  // Function to extract latitude and longitude from an SD packet
  extractLatLong(packet) {
    const parts = packet.split(';');
    const latitude = this.parseCoordinate(parts[2], parts[3]);
    const longitude = this.parseCoordinate(parts[4], parts[5]);
    return { latitude, longitude };
  }

  // Function to parse latitude/longitude coordinates
  parseCoordinate(coordinate, direction) {
    const degrees = parseInt(coordinate.slice(0, -7)); // Extract degrees
    const minutes = parseFloat(coordinate.slice(-7)); // Extract minutes
    const sign = direction === 'N' || direction === 'E' ? 1 : -1;
    return sign * (degrees + minutes / 60);
  }
}

module.exports = PacketBuffer;
