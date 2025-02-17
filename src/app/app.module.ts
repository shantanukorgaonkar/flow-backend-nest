import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenaiService } from '../openai/openai.service';
import { GroqAIService } from '../groq/groq.service';
import { UserEntity } from '../db/user.entity';
import { UserService } from '../users/users.service';
import { UserController } from '../users/users.controller';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { QuestionEntity } from '../db/question.entity';
import { JournalEntryEntity } from '../db/journal-entry.entity';
import { SessionEntity } from '../db/session.entity';
import { FrameworkEntity } from '../db/framework.entity';
import { FrameworkQuestionEntity } from '../db/framework-question.entity';
import { QuestionController } from '../questions/questions.controller';
import { QuestionService } from '../questions/questions.service';
import { ClientController } from 'src/client/client.controller';
import { FrameworkService } from 'src/frameworks/framework.service';
import { JournalEntryService } from '../journal-entry/journal-entry.service';
import { FrameworkController } from '../frameworks/framework.controller';
import { SessionController } from 'src/journal-entry/session.controller';
import { SessionModule } from 'src/journal-entry/session.module';
import { SessionService } from 'src/journal-entry/session.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
    DatabaseModule,
    AuthModule,
    PrismaModule,
    TypeOrmModule.forFeature([ 
      UserEntity, QuestionEntity, JournalEntryEntity, SessionEntity, FrameworkEntity, FrameworkQuestionEntity
    ])
  ],
  controllers: [AppController, UserController, QuestionController, ClientController, FrameworkController, SessionController],
  providers: [AppService, ConfigService, OpenaiService, GroqAIService, UserService, AuthService, JwtService, QuestionService, FrameworkService, JournalEntryService, SessionService],
})
export class AppModule { }
