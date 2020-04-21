import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MessageModule } from "./message/message.module";
import { GraphQLModule } from "@nestjs/graphql";
import { MessageService } from "./message/message.service";
import * as jwt from "jsonwebtoken";

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot({
                context: ({ req, connection }) => (connection ? { request: connection.context } : { request: req }),
                installSubscriptionHandlers: true,
                typePaths: ["./**/*.graphql"],
                subscriptions: {
                    onConnect: param => {
                        console.log("connect")
                        try{
                            const token = param["Authorization"];
                            if(!token) throw new Error("Not have token");
                            
                            const decoded = jwt.verify(token.split(" ")[1], "sup3rs3cr3t");
                            if(!decoded) throw new Error("Invalid token");

                            return decoded;

                        }
                        catch(err){
                            console.log(err);
                            return false;
                        }
                    }
                }
           
        }),
        MessageModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
