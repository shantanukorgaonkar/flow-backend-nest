import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService],
  providers: [OpenaiService],
  exports: [OpenaiService],

})
export class OpenaiModule {}
