import { User } from '@prisma/client';
import { plainToClass, Expose } from 'class-transformer';

export class UserResponseDto implements Omit<User, 'id' | 'password'> {
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Expose()
  isEmailConfirmed: boolean;
  static mapFrom(data: User): UserResponseDto {
    return plainToClass(UserResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}

/*
--- Don't expose the id in the response ---
@Expose()
id: string;
*/