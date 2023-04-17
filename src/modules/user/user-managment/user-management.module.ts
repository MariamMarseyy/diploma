import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UserManagementService } from './user-management.service';
import { UserDetails } from '@modules/user/models/user-details.model';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([User, UserDetails]),
  ],
  providers: [UserManagementService],
  exports: [UserManagementService],
})
export class UserManagementModule {}
