import { Module } from '@nestjs/common';
import { IngredientsResolver } from './ingredients.resolver';

@Module({
  providers: [IngredientsResolver],
})
export class IngredientsModule {}
