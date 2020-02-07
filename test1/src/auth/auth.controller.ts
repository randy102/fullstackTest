import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post("register")
    register(@Body() {password, username, name}, @Res() res:Response) {
        
        const result = this.authService.register({password,username,name});
        console.log({result});
        if(result){
            res.status(204).end();
        }
        else
            res.status(409).end();
    }

    @Post('login')
    login(@Body() {password,username}, @Res() res: Response){
        const result = this.authService.login({password,username});
        if(result){
            res.json({token: result});
        }
        else
            res.status(401).end();
    }
}
