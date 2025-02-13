import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { FrameworkModule } from '../frameworks/framework.module';
import { QuestionModule } from '../questions/questions.module';

@Module({
    imports: [FrameworkModule, QuestionModule],
    controllers: [ClientController],
})
export class ClientModule {}
