import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateIngredientDTO } from './dto/create-ingredient.dto';
import { UpdateIngredientDTO } from './dto/update-ingredient.dto';

@Resolver(of => Ingredient)
export class IngredientsResolver {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Query(returns => Ingredient)
  async ingredient(@Args('id') id: string): Promise<Ingredient> {
    const ingredient: Ingredient = await this.ingredientsService.getById(id);

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${id} was not found.`);
    }

    return ingredient;
  }

  @Query(returns => [Ingredient])
  async ingredients(): Promise<Ingredient[]> {
    return await this.ingredientsService.getAll();
  }

  @Mutation(returns => Ingredient)
  async createIngredient(
    @Args('createIngredientDTO') createIngredientDTO: CreateIngredientDTO,
  ): Promise<Ingredient> {
    const ingredient: Ingredient = await this.ingredientsService.create(
      createIngredientDTO,
    );

    if (!ingredient) {
      throw new InternalServerErrorException(
        `Ingredient was not created successfully.`,
      );
    }

    return ingredient;
  }

  @Mutation(returns => Ingredient)
  async updateIngredient(
    @Args('updateIngredientDTO') updateIngredientDTO: UpdateIngredientDTO,
  ): Promise<Ingredient> {
    const ingredient: Ingredient = await this.ingredientsService.update(
      updateIngredientDTO,
    );

    if (!ingredient) {
      throw new NotFoundException(
        `Unable to find ingredient with id ${updateIngredientDTO.id}.`,
      );
    }

    return ingredient;
  }

  @Mutation(returns => Ingredient)
  async deleteIngredient(@Args('id') id: string): Promise<boolean> {
    const success: boolean = await this.ingredientsService.delete(id);

    return success;
  }
}
