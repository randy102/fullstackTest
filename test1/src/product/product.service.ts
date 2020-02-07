import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

@Injectable()
export class ProductService {
    getProtected(token){
        if(token && jwt.verify(token, "secret")){
            return jwt.decode(token);
        }
        return undefined;
    }
}
