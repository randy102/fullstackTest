import { Controller, Get, Req, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { Request, Response } from 'express';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Get('public')
    productPublic(){
        return "public content";
    }

    @Get('protected')
    productProtected(@Req() req: Request, @Res() res: Response){
        try{

            const Authorization = req.get("Authorization");
            if(!Authorization) throw new Error();
            
            const token = Authorization.split(" ")[1]
            if(!token) throw new Error();

            const result = this.productService.getProtected(token);
            if(!result) throw new Error();
            
            res.send(`private content of ${result['userID']}`);
           
        }catch(err){
            res.status(403).end();
        }
    }
}
