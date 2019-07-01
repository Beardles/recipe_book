import { InputType, Field } from 'type-graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateIngredientDTO {
  @Field()
  @MaxLength(255)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  notes?: string;
}
