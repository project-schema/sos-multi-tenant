import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config';

@Module({
  imports: [
    // for public visible files
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    //   serveRoot: '/uploads',
    // }),
    //
    CustomConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
