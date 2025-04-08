import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { BcryptService } from 'src/config/bcrypt/bcrypt.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async login(email: string, password: string): Promise<number> {
    const user = await this.adminRepository.getUserByEmail(email);
    const hashedPassword = await this.bcryptService.hashPassword(password);
    const samePassword:boolean = await this.bcryptService.comparePassword(password, user.password)

    if (!samePassword)
      throw new BadRequestException();

    return user.id;
  }
}
