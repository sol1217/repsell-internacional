import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { Payload } from './auth.model';
import { JoseService } from 'src/config/jose/jose.service';
import { LoginRequestDto, LoginResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly joseService: JoseService,
  ) {}

  private async createToken(payload: Payload): Promise<string> {
    return this.joseService.generateSignedToken(payload);
  }

  async login(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = loginRequest;
    const id: number = await this.adminService.login(email, password);
    const token= await this.createToken({id})
    return {
        authToken: token
    }
  }
}
