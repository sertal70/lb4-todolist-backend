import { DefaultCrudRepository, juggler, DataObject, AnyObject, Filter } from '@loopback/repository';
import { Todo } from '../models';
import { MongodbDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { ObjectId } from 'bson';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id
  > {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Todo, dataSource);
  }

  async create(entity: DataObject<Todo>, options?: AnyObject | undefined): Promise<Todo> {
    entity.todoListId = entity.todoListId ? new ObjectId(entity.todoListId) : null;
    return super.create(entity, options);
  }

  async find(filter?: Filter<Todo> | undefined, options?: AnyObject | undefined): Promise<Todo[]> {
    if (filter && filter.where && filter.where.todoListId) {
      filter.where.todoListId = new ObjectId(filter.where.todoListId);
    }
    return super.find(filter, options);
  }

}
