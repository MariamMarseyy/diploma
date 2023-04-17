import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@modules/user/user-managment/dto/create-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
