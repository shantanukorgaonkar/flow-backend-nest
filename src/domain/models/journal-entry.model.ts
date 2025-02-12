import { BaseModel } from "../../common/base.model";
import { QuestionModel } from "./question.model";
import { SessionModel } from "./session.model";
import { UserModel } from "./user.model";

export class JournalEntryModel extends BaseModel {
    id: string;
    entry: string;
    user?: UserModel;
    question?: QuestionModel;
    session?: SessionModel;
}
