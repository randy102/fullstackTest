import { Injectable } from '@nestjs/common';
import * as uuid from "uuid/v4"
@Injectable()
export class FileService {
    dangerFiles: any[]
    constructor(){
        this.dangerFiles = [];
    }

   
}
