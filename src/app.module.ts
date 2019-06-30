import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { AppController } from './app.controller';
import { IngredientsModule } from './ingredients/ingredients.module';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    IngredientsModule,
    RecipesModule,
    GraphQLModule.forRoot({
      debug: config.get('graphql.debug'),
      playground: config.get('graphql.playground'),
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: config.get('database.url'),
      database: config.get('database.name'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
