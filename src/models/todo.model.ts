import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strictObjectIDCoercion: true } })
export class Todo extends Entity {
  @property({
    type: 'string',
    id: true,
    //required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property()
  todoListId: any; //tslint:disable-line

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}
