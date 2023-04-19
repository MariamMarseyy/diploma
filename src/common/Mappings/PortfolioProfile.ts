import { Inject, Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  ignore,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Portfolio } from '@modules/portfolio/models/portfolio.model';
import { PortfolioDto } from '@modules/portfolio/dto/portfolio.dto';

@Injectable()
export class PortfolioProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Portfolio, PortfolioDto);
      createMap(
        mapper,
        PortfolioDto,
        Portfolio,
        forMember((dest) => dest.id, ignore()),
        forMember((dest) => dest.user_id, ignore()),
      );
    };
  }
}
