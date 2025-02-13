import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JournalEntryEntity } from "src/db/journal-entry.entity";
import { JournalEntryService } from "./journal-entry.service";
import { SessionEntity } from "src/db/session.entity";
import { SessionService } from "./session.service";

@Module({
    imports: [TypeOrmModule.forFeature([JournalEntryEntity, SessionEntity])],
    providers: [JournalEntryService, SessionService],
    exports: [JournalEntryService, SessionService]
})
export class JournalEntryModule {}
