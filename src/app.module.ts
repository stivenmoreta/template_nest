import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi-schema.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfiguration],
      //con el paquete joi podemos validar el .env
      //TODO: investigar el paquete
      validationSchema: JoiValidationSchema
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),

    AuthModule,
    UserModule,
    CommonModule
    ],
})
export class AppModule {}
