import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Res,
    Get,
    Query
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { Response } from "express";
import * as multer from "multer";
import * as fs from "fs";
@Controller("file")
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post("upload")
    @UseInterceptors(
        FileInterceptor("file", {
            limits: {
                fileSize: 1024*30
            },
            storage: multer.diskStorage({
                destination: function(req, file, cb) {
                    cb(null, "/tmp");
                },
                filename: function(req, file, cb) {
                
                    const randomName = Array(16)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join("");
                    cb(null,randomName);
                }
            }),
            
        })
    )
    upload(@UploadedFile() file, @Res() res: Response) {
        
        var PNG_MAGIC_NUMBERS =  '89504e47'
        var bitmap = fs.readFileSync('/tmp/' + file.filename).toString('hex', 0, 4)
       
        if(bitmap !== PNG_MAGIC_NUMBERS){
            fs.unlinkSync('/tmp/' + file.filename)
            res.status(415).end();
        }
        else{
           
            res.status(201).send({
                id: file.filename,
                originalname: file.originalname,
                size: file.size
            });
        }
    }

    @Get("download")
    download(@Query("id") id: string, @Res() res: Response) {
        if(id.match(/[/.]/))
            res.status(400).end();
        else
        res.sendFile(id,{ root: './tmp' });
    }
}
