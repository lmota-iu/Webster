import { UserResponseDto } from './user.response.dto';

export class SignInResponseDto {
  accessToken: string;
  user: UserResponseDto;
}
