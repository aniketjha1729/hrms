import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/auth-guard';
import { CreateUserRequest } from '../dto/create-user.request';
import { LoginUserRequest } from '../dto/login-user-request';
import { UserResponse } from '../dto/user.response';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return this.userService.createUser(createUserRequest);
  }

  @Post('signin')
  async signIn(@Body() loginUserRequest: LoginUserRequest): Promise<string> {
    return this.userService.signInUser(loginUserRequest);
  }

  @UseGuards(JwtGuard)
  @Get('ok')
  @ApiBearerAuth('JWT-auth')
  async checkAuth(): Promise<string> {
    return 'dfd';
  }
}
