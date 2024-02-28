// packet-buffer.module.ts

import { Module } from '@nestjs/common';
import { PacketBuffer } from './packet-buffer.service';

@Module({
  providers: [PacketBuffer],
  exports: [PacketBuffer],
})
export class PacketBufferModule {}
