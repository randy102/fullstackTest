import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
@Injectable()
export class AuthorService {
    authors: any[];
    constructor(){
        this.authors = [];
    }

    create({firstName, lastName, dob}){
        if(firstName && lastName && dob){
            const author = {firstName, lastName, dob, id: new Date().toISOString()};
            this.authors.push(author);
            return author;
        }
        return undefined;
    }

    get(id){
        return this.authors.find(author => author.id === id);
    }

    verify(token){
        return jwt.verify(token,"s3cr3t");
    }
}

