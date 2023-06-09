import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthModule } from '@modules/auth/auth.module';
import databaseConfig from '@common/database/config/database.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '@modules/user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PortfolioModule } from '@modules/portfolio/portfolio.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
      validate,
    }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    // load .env
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => [
    //     {
    //       store: 'memory',
    //     },
    //   ],
    //   inject: [ConfigService],
    // }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    // ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    PortfolioModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
