import { MongoRepository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsRepository } from './ingredients.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

export class IngredientsService {
  constructor(
    @InjectRepository(IngredientsRepository)
    private ingredientsRepository: IngredientsRepository,
  ) {}

  async getById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientsRepository
      .findOne({ id })
      .catch(e => {
        throw new InternalServerErrorException(
          `Error trying to get ingredient by id ${id}: ${e}.`,
        );
      });
    return ingredient;
  }

  async getAll(): Promise<Ingredient[]> {
    const ingredients = await this.ingredientsRepository.find().catch(e => {
      throw new InternalServerErrorException(
        `Error trying to get all ingredients: ${e}.`,
      );
    });
    return ingredients;
  }
}
