import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Todo, TodoList } from '../models';
import { MongodbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { TodoRepository } from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id
  > {
  public readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter(TodoRepository) protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todos = this._createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter);


  }

}
