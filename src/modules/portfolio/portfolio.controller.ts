import { Body, Controller, Get, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@currentUser';
import { User } from '@modules/user/models/user.model';
import { CreateUserDto } from '@modules/user/user-managment/dto/create-user.dto';
import { PortfolioDto } from '@modules/portfolio/dto/portfolio.dto';
import { BinanceService } from '@modules/portfolio/binance/binance.service';

@ApiTags('Portfolio')
@ApiBearerAuth()
@Controller('user')
export class PortfolioController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly binanceService: BinanceService,
  ) {}
  @Post('portfolio')
  @ApiOperation({ summary: 'add portfolio' })
  async create(
    @CurrentUser() currentUser: User,
    @Body() portfolioDto: PortfolioDto,
  ) {
    await this.portfolioService.addPortfolio(currentUser, portfolioDto);
    return true;
  }

  @Get('binance')
  @ApiOperation({ summary: 'add binance exchange' })
  async getBinance(@CurrentUser() currentUser: User) {
    await this.portfolioService.binanceForCurrentUser(currentUser);
    return true;
  }
}
