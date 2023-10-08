import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponseDto,
} from './user.dto';
import { LoginResponseI } from '../shared/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signUp')
  async createUser(
    @Body() createUserRequest: CreateUserRequest
  ): Promise<UserResponseDto | HttpException> {
    try {
      const createdUser = await this.userService.createUser(createUserRequest);
      return new UserResponseDto(createdUser);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        'Unable to save user',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: new Error(err) }
      );
    }
  }

  @Post('signIn')
  async signIn(
    @Body() loginUserRequest: LoginUserRequest
  ): Promise<LoginResponseI> {
    const jwt: string = await this.userService.signInUser(loginUserRequest);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 10000,
    };
  }

  @UseGuards(RolesGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<string> {
    return req.user.id;
  }
}
