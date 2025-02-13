import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { UserEntity } from '../db/user.entity';
import { UserModel } from '../domain/models/user.model';
import { LoginUserDto } from '../dto/login.user';
import { GenerateAuthToken } from '../common/generate.auth.token';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async findUserByEmail(email: string): Promise<UserModel | null> {
        const user = await this.userRepository.findOneBy({ email });
        return user
    }

    async findUserByPhoneNumber(phoneNumber: string): Promise<UserModel | null> {
        const user = await this.userRepository.findOneBy({ phoneNumber });
        return user
    }

    async findOneUserById(id: number): Promise<UserModel | undefined> {
        const entity = await this.userRepository.findOneBy({ id });
        return entity?.toUserModel();
    }

    async resetPassword(userId: number, password: string) {
        const user = await this.userRepository.findOneBy({ id: +userId })
        if (!user) {
            throw new HttpException('User Not Found.', HttpStatus.NOT_FOUND)
        }
        const hash = await argon.hash(password);
        user.password = hash
        return await this.userRepository.save(user)
    }

    async login(email: string, password: string) {
        const user = await this.findUserByEmail(email)
        if (!user) {
            throw new HttpException('User Not Found.', HttpStatus.NOT_FOUND)
        }
        const passwordMatch = await argon.verify(user.password, password)
        if (!passwordMatch) {
            throw new HttpException('Password Incorrect.', HttpStatus.BAD_REQUEST)
        }
        const jwtTokenPayload = { userId: user.id, email: user.email, phoneNumber: user.phoneNumber }
        const token = await new GenerateAuthToken(this.jwtService, this.configService).generate(jwtTokenPayload)
        return JSON.stringify({ accessToken: token, user: user })
    }

}

