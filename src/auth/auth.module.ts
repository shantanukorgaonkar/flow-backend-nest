import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserController } from '../users/users.controller';
import { UserEntity } from '../db/user.entity';
import { AuthService } from './auth.service';
import { UserService } from '../users/users.service';
import { UserModule } from '../users/user.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({}), UserModule],
  controllers: [UserController],
  providers: [AuthService, JwtStrategy, { provide: APP_GUARD, useClass: JwtAuthGuard }, RolesGuard],
  exports: [RolesGuard, AuthService]
})
export class AuthModule { }
