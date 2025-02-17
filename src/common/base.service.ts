import { Injectable } from "@nestjs/common";
import { BaseModel } from "./base.model";
import { EntityMapper } from "./base.entity";

@Injectable()
export abstract class BaseService<T extends EntityMapper<K>, K extends BaseModel> {
    constructor(
        // protected readonly repository: Repository<T>,
        private readonly entityType: new () => T
    ) { }

    // async create(model: K): Promise<T> {
    //     const entity = new this.entityType().copy(model);
    //     return await this.user_entity.create({ data: entity });
    // }

    // async update(model: K): Promise<T> {
    //     const entity = new this.entityType().copy(model);
    //     return await this.repository.save(entity);
    // }

    // async findAll(): Promise<K[]> {
    //     const entities = await this.repository.find();
    //     return entities.map(entity => entity.toModel());
    // }

    // async findOne(id: string): Promise<K | undefined> {
    //     const entity = await this.repository.findOneBy({ id } as any);
    //     return entity ? entity.toModel() : undefined;
    // }

    // async delete(id: string): Promise<void> {
    //     await this.repository.softDelete({ id } as any);
    // }
}