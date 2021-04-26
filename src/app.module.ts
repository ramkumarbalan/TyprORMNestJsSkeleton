import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/v1/user/user.module';
import { AddressModule } from './modules/v1/address/address.module';
import { ConfigModule } from '@nestjs/config';
import { getDBConfigs } from './config/infrastructure.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRoot(getDBConfigs()),
    UserModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
