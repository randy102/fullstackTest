import { Injectable } from '@nestjs/common';
import {uuid} from "uuidv4"
import * as jwt from "jsonwebtoken"
@Injectable()
export class MessageService {
    messages: any[];
    constructor(){
        this.messages = [];
    }

    createMessage({content, roomID,userID}){
        const message = {
            _id: uuid(),
            content,
            roomID,
            createdBy: userID,
            createdAt: new Date().getTime()
        }
        this.messages.push(message);
        return message;   
    }

   
}
