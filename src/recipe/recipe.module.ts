import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeSchema } from '../schemas/recipe.schema';
import { MacrosService } from 'src/macros/macros.service';
import { MacrosModule } from 'src/macros/macros.module';
//import { RecipeSchema } from './recipe.model';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    MacrosModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService, ConfigService],
})
export class RecipeModule {}
