import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { MessageModule } from './message/message.module';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [
    ConfigModule.forRoot(), 
    GraphQLModule.forRoot({
      context: ({req}) => ({request: req}),
      installSubscriptionHandlers: true,
      typePaths: ['./**/*.graphql'],
    }),
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
