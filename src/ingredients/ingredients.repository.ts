import { EntityRepository, MongoRepository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';

@EntityRepository(Ingredient)
export class IngredientsRepository extends MongoRepository<Ingredient> {}
