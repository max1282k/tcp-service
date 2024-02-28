import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TcpService } from './tcp.service';
import { PacketBufferModule } from './packet-buffer.module';

@Module({
  imports: [PacketBufferModule],
  controllers: [AppController],
  providers: [AppService, TcpService],
})
export class AppModule {}
