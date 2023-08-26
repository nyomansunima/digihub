import { PartialType } from '@nestjs/mapped-types'
import { User } from './user.payload'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserInput extends PartialType(User) {}

export class UpdateUserInput extends CreateUserInput {}
