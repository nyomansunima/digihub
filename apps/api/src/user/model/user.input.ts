import { PartialType } from '@nestjs/mapped-types'
import { User } from './user.payload'

export class CreateUserInput extends PartialType(User) {}

export class UpdateUserInput extends CreateUserInput {}
