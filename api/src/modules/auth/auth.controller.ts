import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation } from "@nestjs/swagger";
import { LoginRequestDto, LoginResponseDto } from "./auth.dto";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @ApiOperation({})
    @Post('/login')
    async login(@Body()credenials: LoginRequestDto):Promise<LoginResponseDto>{
        return this.authService.login(credenials)
    }
}