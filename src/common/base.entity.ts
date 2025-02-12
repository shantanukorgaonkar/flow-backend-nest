import { BaseModel } from "./base.model"

//Will enforce a similar structure for entites in the data layer
export interface EntityMapper<TModel extends BaseModel> {
    
        copy(model: TModel);

        toModel(): TModel;
}