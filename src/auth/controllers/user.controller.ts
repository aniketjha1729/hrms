import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from '../dto/create-user.request';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post("signup")
  async createUser(@Body() createUserRequest: CreateUserRequest): Promise<any> {
    return this.userService.createUser(createUserRequest);
  }
}
