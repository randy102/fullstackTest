import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    users: any[];
    constructor() {
        this.users = [];
    }
    getUser(username) {
        const user = this.users.find(user => user.username === username);
        return user;
    }

    addUser({ name, username, password: hash, _id }){
        this.users.push({ name, username, password: hash, _id });
    }
}
