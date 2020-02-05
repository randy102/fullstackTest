import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthorModule } from "./author/author.module";
import { PostModule } from "./post/post.module";
import { GraphQLModule } from "@nestjs/graphql";
@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthorModule,
        PostModule,
        GraphQLModule.forRoot({
            typePaths: ["./**/*.graphql"],
            context: ({req}) => ({request: req})
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
