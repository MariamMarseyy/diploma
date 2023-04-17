import { Body, Controller, Patch, Post, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { IsPublic } from '@common/decorators/is-public.decorator';
import {
  AuthRequestDto,
  SignUpDto
} from "./dto/auth.dto";
import { IAuthResponse } from "@interfaces/auth/IAuthResponse";
import { IAuthMessage } from "@interfaces/auth/IAuthMessage";
@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly _auth: AuthService) {}
  /**
   * user sign up
   * @param signUpDto
   */
  @IsPublic()
  @Post('sign-up')
  @ApiOperation({ summary: 'Registration step 1' })
  async signUp(
    @Body() signUpDto: SignUpDto,
  ) {
    return this._auth.signUp(signUpDto);
  }
  /**
   * @description Log in
   * @param credential
   */
  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Log in to system' })
  public async login(
    @Body() credential: AuthRequestDto,
  ): Promise<IAuthResponse | IAuthMessage> {
    return await this._auth.auth(credential);
  }
}
