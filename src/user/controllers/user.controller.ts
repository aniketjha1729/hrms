import { Body, Controller, Post } from '@nestjs/common';
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
}
