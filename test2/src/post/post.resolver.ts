import { Resolver, Args, Context, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { AuthorService } from 'src/author/author.service';

@Resolver('Post')
export class PostResolver {
   
    posts: any[];
    constructor(private readonly authorService: AuthorService){
        this.posts = [];
    }

    @UseGuards(AuthGuard)
    createPost(@Args() {title, content}, @Args('categories') categories: PostCategory, @Context('author') author){
        const post = {
            id: new Date().toISOString(),
            title,
            content,
            createdAt: new Date().getTime(),
            author
        }
        this.posts.push(post);
        return post;
    }

    @ResolveProperty()
    createdBy(@Parent() {author}){
        return this.authorService.get(author);
    }
}

enum  PostCategory{
    PROMOTIONAL = "PROMOTIONAL",
    CONTROVERSIAL = "CONTROVERSIAL",
    LIFESTYLE = "LIFESTYLE",
    PERSONAL= "PERSONAL"
}