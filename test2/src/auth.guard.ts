import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthorService } from './author/author.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authorService: AuthorService){}

  canActivate(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    
    try{
      const { authorization } = gqlCtx.getContext().request.headers;
      if(!authorization) throw new Error();

      const author = this.authorService.verify(authorization.split(" ")[1]);
      if(!author) throw new Error();

      gqlCtx.getContext().author = author['authorID'];
      return true;
    }
    catch(err){

      return false;
    }
  }
}
