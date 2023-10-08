import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRequest, LoginUserRequest } from './user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { UserI } from '../shared/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private authService: AuthService
  ) {}

  async createUser(createUserRequest: CreateUserRequest) {
    const user = await this.userModel.findOne({
      email: createUserRequest.email,
    });
    if (user) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    const passwordHash: string = await this.hashPassword(
      createUserRequest.password
    );
    const userData = {
      email: createUserRequest.email,
      name: createUserRequest.name,
      admin: createUserRequest?.admin,
      password: passwordHash,
    };
    const newUser = new this.userModel(userData);
    const newUserData = await newUser.save();
    return newUserData;
  }

  async signInUser(user: LoginUserRequest): Promise<string> {
    try {
      const foundUser = await this.userModel.findOne({ email: user.email });
      if (foundUser) {
        const matches: boolean = await this.validatePassword(
          user.password,
          foundUser.password
        );
        if (matches) {
          return this.authService.generateJwt(foundUser._id);
        } else {
          throw new HttpException(
            'Login was not successfull, wrong credentials',
            HttpStatus.UNAUTHORIZED
          );
        }
      } else {
        throw new HttpException(
          'Login was not successfull, wrong credentials',
          HttpStatus.UNAUTHORIZED
        );
      }
    } catch (err) {
      console.log(err);

      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return this.authService.hashPassword(password);
  }

  private async validatePassword(
    password: string,
    storedPasswordHash: string
  ): Promise<any> {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }
}
