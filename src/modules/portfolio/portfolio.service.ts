import { Inject, Injectable } from '@nestjs/common';
import { User } from '@modules/user/models/user.model';
import { Portfolio } from '@modules/portfolio/models/portfolio.model';
import { PortfolioDto } from '@modules/portfolio/dto/portfolio.dto';
// import { InjectMapper } from '@automapper/nestjs';
// import { Mapper } from '@automapper/core';
import { BinanceService } from '@modules/portfolio/binance/binance.service';

@Injectable()
export class PortfolioService {
  constructor(
    // @InjectMapper() private readonly classMapper: Mapper,
    @Inject() private readonly binanceService: BinanceService,
    @Inject() private readonly _user: typeof User,
  ) {}

  public async addPortfolio(user: User, portfolioDto: PortfolioDto) {
    // const portfolios = user.portfolios ?? [];
    // const portfolio = this.classMapper.map(
    //   portfolioDto,
    //   PortfolioDto,
    //   Portfolio,
    // );
    // portfolio.user_id = user.id;
    // return await portfolio.save();
  }
  public async binanceForCurrentUser(user: User) {
    const portf = await this._user.findOne({
      where: {
        email: user.email,
      },
      attributes: ['id', 'email', 'createdAt'],
      include: [
        {
          model: Portfolio,
          attributes: {
            exclude: ['user_id', 'exchange', 'api_key', 'api_secret'],
          },
          where: {
            exchange: 'binance',
          },
        },
      ],
    });
    console.log(user);
    return user;
  }
}
