import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { JoseService } from 'src/config/jose/jose.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly joseService: JoseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException();

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) throw new UnauthorizedException();
    try {
      const payload = await this.joseService.decodeSignedToken(token);
      (request as any).user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
