import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from "jsonwebtoken";

@Injectable()
export class MessageGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const {authorization} = gqlCtx.getContext().headers;
    if(!authorization) return false;
    gqlCtx.getContext().user = jwt.verify(authorization, "sup3rs3c");
    return true;
  }
}
