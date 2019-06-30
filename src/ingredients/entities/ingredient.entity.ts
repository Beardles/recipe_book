import { Field, ID, ObjectType } from 'type-graphql';
import { ObjectIdColumn, Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Ingredient {
  @Field(type => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  notes?: string;
}
