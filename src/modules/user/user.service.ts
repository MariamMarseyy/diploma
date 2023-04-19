import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Op, Transaction } from 'sequelize';
import { genSaltSync, hashSync } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserDetails } from '@modules/user/models/user-details.model';
import { Portfolio } from '@modules/portfolio/models/portfolio.model';

@Injectable()
export class UserService {
  constructor(
    private readonly _sequelize: Sequelize,
    @InjectModel(User)
    private readonly _user: typeof User,
    @InjectModel(UserDetails)
    private readonly _userDetails: typeof UserDetails,
  ) {}

  /**
   * @description Update User Password
   */
  public async changePassword(
    user: User,
    oldPassword: string,
    password: string,
    transaction?: Transaction,
  ) {
    if (oldPassword && !user.verifyPassword(oldPassword)) {
      throw new NotFoundException('Wrong password');
    }

    await user.update(
      {
        password,
      },
      { transaction },
    );
    return {
      statusCode: 200,
      message: 'password is changed',
    };
  }

  /**
   * @description Get User Data By His Email Address
   * @param email
   * @param password
   */
  public async getUserByEmail(email: string, password = false): Promise<User> {
    return await this._user.findOne({
      where: {
        email: email,
      },
      attributes: [
        'id',
        'email',
        ...(password ? ['password'] : []),
        'createdAt',
      ],
      include: [
        {
          model: UserDetails,
          attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      ],
      rejectOnEmpty: false,
    });
  }

  /**
   * @description Get User Data By His Email Address
   * @param $id
   * @param password
   */
  public async getUserById($id: string, password = false): Promise<User> {
    return await User.findByPk<User>($id, {
      attributes: ['id', 'email'],
      include: [
        {
          model: UserDetails,
          attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      ],
      rejectOnEmpty: new BadRequestException('User not found'),
    });
  }

  /**
   * @description Check User Data By His JWT Decoded Data
   * @param $id
   */
  public async validateUser($id: string): Promise<User> {
    const user = await User.findByPk<User>($id, {
      rejectOnEmpty: false,
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  // public async addPortfolio(user: User) {
  //   const portfolios = user.portfolios ?? [];
  //   const portfolio = new Portfolio();
  //   portfolio.api_key = 'zxjx';
  //   portfolio.exchange = 'coinbasee';
  //   portfolio.api_secret = 'bzjjzsl';
  //   portfolio.user_id = user.id;
  //   portfolios.push(portfolio);
  //   // return await Portfolio.create({
  //   //   api_key: 'zxx',
  //   //   exchange: 'coinbase',
  //   //   api_secret: 'bzbzsl',
  //   //   user_id: user.id,
  //   // });
  //   //   {
  //   //     portfolios: portfolios,
  //   //   },
  //   //   {
  //   //     where: { id: user.id },
  //   //   },
  //   // );
  //
  //   return await user.update(
  //     {
  //       portfolios: user.portfolios,
  //     },
  //     {
  //       where: {
  //         id: user.id,
  //       },
  //     },
  //   );
  // }

  /**
   *
   * @param id
   * @param password
   */
  async changeUserPassword(id: string, password: string) {
    const salt = genSaltSync(12);
    const hashedPassword = hashSync(password, salt);
    return await this._user.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}
