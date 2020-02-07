import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import {uuid} from "uuidv4";
@Injectable()
export class AuthorService {
    authors: any[];
    constructor(){
        this.authors = [];
    }

    create({firstName, lastName, dob}){
        if(firstName && lastName && dob){
            const author = {firstName, lastName, dob, id: uuid()};
            this.authors.push(author);
            return author;
        }
        return undefined;
    }

    get(id){
        const author = this.authors.find(author => author.id === id);
        return author;
    }

    verify(token){
        return jwt.verify(token,"s3cr3t");
    }
}

