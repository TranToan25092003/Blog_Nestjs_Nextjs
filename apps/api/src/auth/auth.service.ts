import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/signin.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    // prisma service
    private readonly prisma: PrismaService,

    // jwt service
    private readonly jwt: JwtService,
  ) {}

  //   check user account
  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Password is incorrect');
    }

    return user;
  }

  //   gen token
  private async generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: userId,
    };

    const accessToken = await this.jwt.signAsync(payload);

    return { accessToken };
  }

  //   login
  async login(user: User) {
    const { accessToken } = await this.generateToken(user.id);

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }

  // validate jwt user
  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const currentUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      bio: user?.bio,
    };

    return currentUser;
  }
}
