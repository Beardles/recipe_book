import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Ingredient {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
