import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...user } = createUserInput;

    const hashPass = await hash(password);

    return await this.prismaService.user.create({
      data: {
        password: hashPass,
        ...user,
      },
    });
  }
}
