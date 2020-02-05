import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthorService } from './author.service';

@Resolver('Author')
export class AuthorResolver {
    constructor(private readonly authorService: AuthorService){}

    @Mutation()
    createAuthor(@Args('author') {firstName, lastName, dob}){
        return this.authorService.create({firstName,lastName,dob});
    }

    @Query()
    author(@Args() {authorID}){
        const author = this.authorService.get(authorID);
        return author || null;
    }
}
