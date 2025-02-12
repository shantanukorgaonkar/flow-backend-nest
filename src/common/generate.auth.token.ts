import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"

export class GenerateAuthToken {
    constructor(private jwtService: JwtService,
        private configService: ConfigService) { }

    async generate(jwtTokenPayload): Promise<string> {

        const jwtSecret = this.configService.getOrThrow("JWT_SECRET")
        const expiry = this.configService.getOrThrow("JWT_EXPIRY")
        const token = await this.jwtService.signAsync(jwtTokenPayload, { secret: jwtSecret, expiresIn: expiry })
        return token
    }

}