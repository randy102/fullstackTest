import { Resolver, Subscription, Context, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { MessageGuard } from 'src/message.guard';
const pubSub = new PubSub();

@Resolver('Message')
@UseGuards(MessageGuard)
export class MessageResolver {
    constructor(private readonly messageService:  MessageService){}

    @Subscription("messageCreated",{
        filter: (payload, variables,context)=>{
            console.log(context);
            const privileges: string[] = context.request.privileges;
            const roomID: string = payload.messageCreated.roomID;
            if(privileges.includes(roomID) && roomID === variables.roomID) return true;
            return false;
        }
    })
    messageCreated(){
        return pubSub.asyncIterator("chat");
    }

    @Mutation()
    createMessage(@Args('message') {content, roomID}, @Context('user') {userID, privileges} : UserContext){
        if(privileges.includes(roomID)){
            const messageCreated = this.messageService.createMessage({content, roomID,userID});
            pubSub.publish("chat",{messageCreated});
            return messageCreated;
        }
        return null;
    }
}

interface UserContext{
    userID: string;
    privileges: string[];
}