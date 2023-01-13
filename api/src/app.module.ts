import { UserModule } from './user/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';

@Module({
  controllers: [AppController],
  imports: [EventModule, UserModule],
  providers: [AppService],
})
export class AppModule {}
