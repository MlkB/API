import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'./.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>({
          type:'postgres',
          url: configService.get('POSTGRES_URI'),
          autoLoadEntities: true,
          synchronize: true, //may cause data loss , need to code migrations
        }),
        inject: [ConfigService],
    }),
    
    TypeOrmModule.forFeature([UserEntity,]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
