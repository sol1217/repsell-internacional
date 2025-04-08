import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'example@mail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'Str0ng-P@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT authetication token',
    example: "'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'",
  })
  authToken: string;
}
