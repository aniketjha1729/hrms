import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';
import { User } from './user.model';

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  admin?: boolean;
}

export class LoginUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserResponseDto {
  readonly email: string;

  constructor(user: User) {
    this.email = user.email;
  }
}
