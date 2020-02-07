import { Resolver, Args, Context, ResolveProperty, Parent, Mutation } from '@nestjs/graphql';
import { UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { AuthorService } from 'src/author/author.service';
import {uuid} from "uuidv4"
@Resolver('Post')
export class PostResolver {
   
    posts: any[];
    constructor(private readonly authorService: AuthorService){
        this.posts = [];
    }

    @UseGuards(AuthGuard)
    @Mutation()
    createPost(@Args('postInput') postInput, @Context('author') author: string){
        const post = {
            id: uuid(),
            title: postInput.title,
            content: postInput.content,
            categories: postInput.categories,
            createdAt: new Date().getTime(),
            author,
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

interface PostInput{
    title: string;
    content: string;
    categories: PostCategory[];
}