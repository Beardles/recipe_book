import { Resolver, Args } from '@nestjs/graphql';
import { Ingredient } from './models/ingredient';
import { Query } from 'type-graphql';

@Resolver(of => Ingredient)
export class IngredientsResolver {
  @Query(returns => Ingredient)
  async getRecipe(@Args('id') id: string): Promise<Ingredient> {
    return new Ingredient();
  }
}
