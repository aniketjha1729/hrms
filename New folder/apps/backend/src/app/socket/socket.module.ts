import { Module } from '@nestjs/common';
import { SocketGateway } from './gateway/socket.gateway';

@Module({
  providers: [SocketGateway],
})
export class SocketModule {}
