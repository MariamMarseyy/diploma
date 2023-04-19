import { CurrentUser } from '@currentUser';
import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Put,
  Body,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserManagementService } from '@modules/user/user-managment/user-management.service';
import { User } from './models/user.model';
import { PaginateDto } from '@common/pagination/paginate.dto';
import { ChangePasswordDto } from '@modules/user/user-managment/dto/change-password.dto';
import { CreateUserDto } from '@modules/user/user-managment/dto/create-user.dto';
// import { UpdateUserOwnDto } from '@modules/user/user-managment/dto/update-user-own.dto';
import { UpdateUserDto } from '@modules/user/user-managment/dto/update-user.dto';
import { MessageCodeError } from '@common/errors/message-code-error';

/**
 *
 */
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _userManagementService: UserManagementService,
  ) {}

  /**
   * create new user
   * @param currentUser
   * @param createUserDto
   */
  @Post()
  @ApiOperation({ summary: 'add more information' })
  async create(
    @CurrentUser() currentUser: User,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this._userManagementService.create(currentUser, createUserDto);
  }

  // @Post('portfolio')
  // @ApiOperation({ summary: 'add zibil' })
  // async createPortfolio(@CurrentUser() currentUser: User) {
  //   await this._userService.addPortfolio(currentUser);
  //   return true;
  // }

  /**
   * Get user Information
   */
  @Get('profile')
  @ApiOperation({ summary: 'Get user Profile' })
  async getUser(@CurrentUser() user: User): Promise<User> {
    return this._userService.getUserById(user.id);
  }

  // /**
  //  * get user by index
  //  * @param id
  //  */
  // @Get(':id')
  // @ApiOperation({ summary: 'Get user' })
  // async findOne(@Param('id') id: string) {
  //   return this._userManagementService.findOne(id);
  // }

  /**
   * @description Change current user password
   *
   * @param user
   * @param changePasswordRequest
   */
  @Put('change-password')
  @ApiOperation({ summary: 'Change current user password' })
  public async changePassword(
    @CurrentUser() user: User,
    @Body() changePasswordRequest: ChangePasswordDto,
  ) {
    if (!user) {
      throw new MessageCodeError('auth:logout:notLoggedIn');
    }
    const currentUser = await this._userService.getUserByEmail(
      user.email,
      true,
    );
    try {
      return await this._userService.changePassword(
        currentUser,
        changePasswordRequest.oldPassword,
        changePasswordRequest.password,
      );
    } catch (error) {
      throw error;
    }
  }
  /**
   * update user by index
   * @param user
   * @param updateUserDto
   */
  // @Put('current')
  // @ApiOperation({ summary: 'Update current user' })
  // async updateCurrent(
  //   @CurrentUser() user: User,
  //   @Body() updateUserDto: UpdateUserOwnDto,
  // ) {
  //   const id = user.id;
  //   return this._userManagementService.update(id, updateUserDto);
  // }

  /**
   * update user by index
   * @param id
   * @param updateUserDto
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this._userManagementService.update(id, updateUserDto);
  }

  /**
   * delete user by index
   * @param id
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Remove user' })
  async remove(@Param('id') id: string) {
    return this._userManagementService.remove(id);
  }
}
