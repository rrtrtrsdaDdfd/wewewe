import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { Auth } from './auth/entities/auth.entity';
import { User } from './user/entities/user.entity';
import { WorkerModule } from './worker/worker.module';
import { Worker } from './worker/entities/worker.entity';


@Module({
  imports: [UserModule, AuthModule, ProductModule,ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: (configService: ConfigService) =>({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      synchronize: true,
      entities: [Product,Auth,User,Worker]
     }),
     inject: [ConfigService],
  }),
  WorkerModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
