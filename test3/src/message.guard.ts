import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from "jsonwebtoken";

@Injectable()
export class MessageGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    console.log("Guard")
    const gqlCtx = GqlExecutionContext.create(context);
    const type = gqlCtx.getInfo().operation.operation;
    if(type === "subscription") return true;
    
    const {authorization} = gqlCtx.getContext().request.headers;

    if(!authorization) return false;
    gqlCtx.getContext().user = jwt.verify(authorization.split(" ")[1], "sup3rs3cr3t");
    return true;
  }
}
