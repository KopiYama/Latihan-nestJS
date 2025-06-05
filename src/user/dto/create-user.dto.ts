// src/user/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty , MinLength} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty({ message: 'Nama wajib diisi' })
  name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  email: string;
}
