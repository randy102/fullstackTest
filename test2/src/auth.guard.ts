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
      const { Authorization } = gqlCtx.getContext().request.headers;
      if(!Authorization) throw new Error();

      const author = this.authorService.verify(Authorization.split(" ")[1]);
      gqlCtx.getContext().author = author['authorID'];
      return true;
    }
    catch(err){

      return false;
    }
  }
}
