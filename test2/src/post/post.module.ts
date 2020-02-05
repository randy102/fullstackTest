import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { AuthorModule } from 'src/author/author.module';

@Module({
  providers: [PostResolver, PostService],
  imports: [AuthorModule]
})
export class PostModule {}
