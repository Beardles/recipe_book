import { Field, ID, ObjectType } from 'type-graphql';
import { ObjectIdColumn, ObjectID, Column, Entity, BaseEntity } from 'typeorm';

@ObjectType()
@Entity()
export class Ingredient extends BaseEntity {
  @Field(type => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  notes?: string;
}
