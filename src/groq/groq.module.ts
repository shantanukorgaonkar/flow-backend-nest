import { Module } from '@nestjs/common';
import { GroqAIService } from './groq.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService],
  providers: [GroqAIService],
  exports: [GroqAIService],

})
export class GroqModule {}
