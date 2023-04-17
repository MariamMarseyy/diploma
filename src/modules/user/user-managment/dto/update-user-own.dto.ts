import { OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from '@modules/user/user-managment/dto/update-user.dto';

export class UpdateUserOwnDto extends OmitType(UpdateUserDto, [
  'roleId',
  'password',
] as const) {}
