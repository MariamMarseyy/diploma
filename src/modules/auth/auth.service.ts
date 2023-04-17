import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AuthRequestDto,
  EmailDto,
  ResetPasswordDto,
  SignUpDto,
} from './dto/auth.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/models/user.model';
import { IAuthResponse } from '@interfaces/auth/IAuthResponse';
import { IAuthMessage } from '@interfaces/auth/IAuthMessage';
import { UserService } from '@modules/user/user.service';
import { IJwtPayload } from '@interfaces/auth/IJwtPayload';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly _user: typeof User,
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  /**
   * @description User Sign Up
   * @param signUpDto
   */
  public async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    const user = await this._user.create({
      email,
      password: password || null,
    });
    return true;
  }
  /**
   * @description Main Auth Service & Return access_token
   * @param loginInfo
   */
  public async auth(
    loginInfo: AuthRequestDto,
  ): Promise<IAuthResponse | IAuthMessage> {
    const user = await this._usersService.getUserByEmail(loginInfo.email, true);
    if (user?.verifyPassword(loginInfo.password)) {
      return await this.login(user);
    } else {
      throw new BadRequestException('Incorrect Credentials');
    }
  }

  public async login(user: User): Promise<IAuthResponse | any> {
    if (!user) throw new NotFoundException('User not Found');
    const userInfo = await this._usersService.getUserByEmail(user.email);

    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      iat: new Date().getTime() / 1000,
    };
    const accessToken = this._jwtService.sign(jwtPayload, {
      expiresIn: '1h',
    });
    if (!accessToken) throw new BadRequestException('Incorrect Credentials');
    const refreshToken = this._jwtService.sign(jwtPayload, {
      expiresIn: '30d',
    });
    user = user.toJSON();
    return {
      authorized: true,
      access_token: accessToken,
      refresh_token: refreshToken,
      userInfo,
    };
  }

  /**
   * logout
   */
  public async logout(user: User) {
    return true;
  }
  /**
   * @description  Validate User Decoded From JWT
   */
  public async validateUser(payload: IJwtPayload): Promise<User> {
    return await this._usersService.validateUser(payload.id);
  }
  // /**
  //  * @description  Validate JWT
  //  */
  // public async verifyJwt(token: string): Promise<any> {
  //   return this._jwtService.verifyAsync(token);
  // }
}
