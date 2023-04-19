import { Injectable } from '@nestjs/common';
import { Spot } from '@binance/connector';

@Injectable()
export class BinanceService {
  async connectBinance(apiKey, apiSecret) {
    const client = new Spot(apiKey, apiSecret);
    console.log(client);
    return true;
  }
}
