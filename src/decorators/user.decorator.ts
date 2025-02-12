import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../auth/jwt.strategy';
import { UserModel, UserType } from '../domain/models/user.model';

export const AuthUser = createParamDecorator(
  (data: UserType | undefined | null, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      switch (data) {
        case UserType.USER:
        case UserType.ADMIN:
          return request.user;
      }
    }
    return request.user as TokenPayload;
  },
);