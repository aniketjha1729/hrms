import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from '../dto/create-user.request';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserRequest: CreateUserRequest): Promise<any> {
    return this.userRepository.insertOne(createUserRequest);
  }
}
