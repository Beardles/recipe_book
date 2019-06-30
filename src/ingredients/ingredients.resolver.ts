import { Resolver, Args, Query } from '@nestjs/graphql';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';
import { NotFoundException } from '@nestjs/common';

@Resolver(of => Ingredient)
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(returns => Ingredient)
  async ingredient(@Args('id') id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientsService.getById(id);

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${id} was not found.`);
    }

    return ingredient;
  }

  @Query(returns => [Ingredient])
  async ingredients(): Promise<Ingredient[]> {
    return await this.ingredientsService.getAll();
  }
}
