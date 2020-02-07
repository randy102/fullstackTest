import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt";
@Injectable()
export class AppService {
    users: any[];

    constructor() {
        this.users = [];
    }

    getHello(): string {
        return "Hello World!";
    }

    register({ name, username, password }) {
        const findUsername = this.users.find(
            user => user.username === username
        );
        
        if (findUsername) return false;
        else {
            var hash = bcrypt.hashSync(password,5);
            var _id = bcrypt.hashSync(password+username,5);
            this.users.push({ name, username, password: hash, _id });
            return true;
        }
    }

    getUser(username) {
        const user = this.users.find(user => user.username === username);
        return user;
    }

    login({password,username}){
        const user = this.getUser(username);
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                let token = jwt.sign({userID: user['_id']},"secret");
                return token;
            }
        }
        return undefined;
    }

    getProtected(token){
        if(token && jwt.verify(token, "secret")){
            return jwt.decode(token);
        }
        return undefined;
    }
}
