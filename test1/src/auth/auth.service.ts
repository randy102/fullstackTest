import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    register({ name, username, password }) {
        const findUsername = this.userService.getUser(username);
        
        if (findUsername) return false;
        else {
            var hash = bcrypt.hashSync(password,5);
            var _id = bcrypt.hashSync(password+username,5);
            this.userService.addUser({ name, username, password: hash, _id });
            return true;
        }
    }

    login({password,username}){
        const user = this.userService.getUser(username);
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                let token = jwt.sign({userID: user['_id']},"secret");
                return token;
            }
        }
        return undefined;
    }

}
