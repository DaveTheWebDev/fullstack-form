import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { UserEventsModule } from './user-event/user-event.module';

@Module({
  controllers: [AppController],
  imports: [UserEventsModule],
  providers: [AppService],
})
export class AppModule {}
