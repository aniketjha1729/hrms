import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private _jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const [type, token] = req.headers['authorization'].split(' ');
      if (type === 'Bearer') {
        const payload = await this._jwtService.verifyAsync(token, {
          secret: 'apple1234',
        });
        req['user'] = payload;
      }
      next();
    } catch (err) {
      console.log(err);
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
  }
}
