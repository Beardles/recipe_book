import { Module } from '@nestjs/common';
import { IngredientsResolver } from './ingredients.resolver';
import { IngredientsService } from './ingredients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsRepository } from './ingredients.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientsRepository])],
  providers: [IngredientsResolver, IngredientsService],
})
export class IngredientsModule {}
