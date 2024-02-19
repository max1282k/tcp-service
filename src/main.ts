import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpService } from './tcp.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const tcpService = app.get(TcpService);
  tcpService.start();
}
bootstrap();
