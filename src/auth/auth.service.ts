import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/type/types';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService:UserService,
    private readonly jwtService: JwtService
  ){}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordIsMatch=await argon2.verify(user.password,password)
    if (user && passwordIsMatch) {
      return user
    }
    
    throw new BadRequestException('user and password are no correct')
  }
  async login(user: IUser) {
    const {id,email}=user
    return{
      id,email,token: this.jwtService.sign({id: user.id, email: user.email}),
    }
  }
  
}
