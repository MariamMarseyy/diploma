import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { CoinbaseService } from './coinbase/coinbase.service';
import { BinanceService } from './binance/binance.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolio } from '@modules/portfolio/models/portfolio.model';
import { User } from '@modules/user/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Portfolio, User])],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    CoinbaseService,
    // PortfolioProfile,
    BinanceService,
  ],
})
export class PortfolioModule {}
