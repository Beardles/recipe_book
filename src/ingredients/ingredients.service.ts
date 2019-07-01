import { Ingredient } from './entities/ingredient.entity';
import { IngredientsRepository } from './ingredients.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateIngredientDTO } from './dto/create-ingredient.dto';
import {
  ObjectId,
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  FindAndModifyWriteOpResultObject,
  UpdateWriteOpResult,
} from 'mongodb';
import { ObjectID } from 'typeorm';
import { UpdateIngredientDTO } from './dto/update-ingredient.dto';

export class IngredientsService {
  constructor(
    @InjectRepository(IngredientsRepository)
    private ingredientsRepository: IngredientsRepository,
  ) {}

  async getById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientsRepository.findOne(id).catch(e => {
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

  async create(createIngredientDTO: CreateIngredientDTO): Promise<Ingredient> {
    const response: InsertOneWriteOpResult = await this.ingredientsRepository
      .insertOne(createIngredientDTO)
      .catch(e => {
        throw new InternalServerErrorException(
          `Error creating ingredient ${JSON.stringify(
            createIngredientDTO,
          )}: ${e}.`,
        );
      });

    const { _id, name, notes } = response.ops[0];
    const ingredient = new Ingredient();
    ingredient.id = _id;
    ingredient.name = name;
    ingredient.notes = notes;

    return ingredient;
  }

  async update(ingredient: Ingredient): Promise<boolean> {
    const { id } = ingredient;
    const response: FindAndModifyWriteOpResultObject = await this.ingredientsRepository
      .findOneAndUpdate({ _id: id }, ingredient)
      .catch(e => {
        throw new InternalServerErrorException(
          `Error updating ingredient ${id}: ${e}.`,
        );
      });

    return response.ok === 1;
  }

  async delete(id: string): Promise<boolean> {
    const response: FindAndModifyWriteOpResultObject = await this.ingredientsRepository
      .findOneAndDelete({ _id: id })
      .catch(e => {
        throw new InternalServerErrorException(
          `Error deleting ingredient ${id}: ${e}.`,
        );
      });

    return response.ok === 1;
  }
}
