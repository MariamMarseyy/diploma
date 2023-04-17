import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { UserManagementService } from '@modules/user/user-managment/user-management.service';
import { UserController } from '@modules/user/user.controller';
import { UserDetails } from '@modules/user/models/user-details.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserDetails]),
  ],
  controllers: [UserController],
  providers: [UserService, UserManagementService],
  exports: [UserService],
})
export class UserModule {}
