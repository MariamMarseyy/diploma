import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { PaginateDto } from '@common/pagination/paginate.dto';
// import { paginate } from '@utils/utils';
import { Op } from 'sequelize';
import { v4 as uuid } from 'uuid';
import { UserService } from '@modules/user/user.service';
import { CreateUserDto } from '@modules/user/user-managment/dto/create-user.dto';
import { UserDetails } from '@modules/user/models/user-details.model';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly _sequelize: Sequelize,
    @InjectModel(User)
    private readonly _user: typeof User,
    @InjectModel(UserDetails)
    private readonly _userDetails: typeof UserDetails,
    private readonly _userService: UserService,
  ) {}

  /**
   * create new user
   * @param currentUser
   * @param createUserDto
   */
  async create(currentUser, createUserDto: CreateUserDto) {
    try {
      const { name, surname } = createUserDto;

      await this._userDetails.create({
        userId: currentUser.id,
        name,
        surname,
      });
      return {
        statusCode: 201,
        message: 'User is created',
      };
    } catch (e) {
      throw e;
    }
  }

  /**
   * update user
   * @param id
   * @param editUserDto
   */
  async update(id: string, editUserDto): Promise<User> {
    try {
      let user: User = await this._user.findOne({
        attributes: ['id', 'email', 'phone'],
        include: [
          {
            model: UserDetails,
            attributes: ['userId', 'name', 'surname'],
          },
        ],
        where: { id },
        rejectOnEmpty: new NotFoundException('user not found'),
      });
      const { name, surname, email, password } = editUserDto;
      user = await user.update({
        email,
        password,
        // userDetails: {
        //   name,
        //   surname,
        // },
      });

      return await user;
    } catch (e) {
      throw e;
    }
  }

  async findAllExportedUserData() {
    return await this._user.findAll({
      attributes: {
        exclude: ['id', 'password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: UserDetails,
          attributes: {
            exclude: ['id', 'userId', 'createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      ],
    });
  }

  /**
   * delete user
   * @param id
   */
  async remove(id: string) {
    try {
      const user = await this._user.findOne({ where: { id } });
      await this._userDetails.destroy({ where: { userId: id } });
      await user.destroy();
      return {
        statusCode: 200,
        message: 'user account is deleted',
      };
    } catch (err) {
      throw new BadRequestException('Unable To Delete');
    }
  }
}
