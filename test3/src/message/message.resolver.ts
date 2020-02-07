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

    @Subscription()
    messageCreated(@Args() {roomID}){
        return pubSub.asyncIterator(roomID);
    }

    @Mutation()
    createMessage(@Args('message') {content, roomID}, @Context('user') {userID, privileges} : UserContext){
        if(privileges.includes(roomID)){
            const messageCreated = this.messageService.createMessage({content, roomID,userID});
            pubSub.publish(roomID,{messageCreated});
            return messageCreated;
        }
        return null;
    }
}

interface UserContext{
    userID: string;
    privileges: string[];
}