import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface AuthPayload {
    userId: number,
    email?: string,
    phoneNumber?: string
}

export class TokenPayload {
    userId: number;
    email?: string;
    phoneNumber?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow("JWT_SECRET")
        });
    }

    async validate(payload: AuthPayload) {
        if (payload.email) {
            return { userId: payload.userId, email: payload.email } as TokenPayload;
        } else if (payload.phoneNumber) {
            return { userId: payload.userId, phoneNumber: payload.phoneNumber } as TokenPayload;
        } else {
            return { userId: payload.userId } as TokenPayload;
        }
    }
}
