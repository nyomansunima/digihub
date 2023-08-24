import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class GoogleAuthInput {
  @IsString()
  @IsNotEmpty()
  accessToken: string

  @IsString()
  @IsNotEmpty()
  idToken: string
}
export class GithubAuthInput {
  @IsString()
  @IsNotEmpty()
  accessToken: string
}

export class EmailPasswordAuthInput {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
