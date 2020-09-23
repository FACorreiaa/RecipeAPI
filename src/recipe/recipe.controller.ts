import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async addRecipe(
    @Body('title') recipeTitle: string,
    @Body('type') recipeType: string,
    @Body('author') recipeAuthor: string,
    @Body('body') recipeBody: string,
    @Body('ingredients') recipeIngredient: string[],
    @Body('comments') recipeComments: [string, Date],
    @Body('upvotes') recipeUpvotes: number,
    @Body('likes') recipeLikes: number,
    @Body('image') recipeImage: string,
    @Body('calories') recipeCalories: number,
    @Body('protein') recipeProtein: number,
    @Body('carbs') recipeCarbs: number,
    @Body('fat') recipeFat: number,
    @Body('fiber') recipeFiber: number,
    @Body('sugar') recipeSugar: number,
    @Body('sodium') recipeSodium: number,
    @Body('water') recipeWater: number,

    /*@Body('satFat') recipeSatFat: number,
    @Body('monoFat') recipeMonoFat: number,
    @Body('poliFat') recipePoliFat: number,
    @Body('fiber') recipeFiber: number,
    @Body('sugar') recipeSugar: number,
    @Body('cholesterol') recipeMonoFat: number,
    @Body('sodium') recipeMonoFat: number,
    @Body('calcium') recipeMonoFat: number,
    @Body('mangesium') recipeMonoFat: number,
    @Body('pot') recipeMonoFat: number,
    @Body('iron') recipeMonoFat: number,
    @Body('zinc') recipeMonoFat: number,
    @Body('phosphrous') recipeMonoFat: number,
    @Body('vitaA') recipeMonoFat: number,
    @Body('vitaC') recipeMonoFat: number,
    @Body('thiamin') recipeMonoFat: number,
    @Body('riboflavin') recipeMonoFat: number,
    @Body('niacin') recipeMonoFat: number,
    @Body('vitaB6') recipeMonoFat: number,
    @Body('fold') recipeMonoFat: number,
    @Body('vitaB12') recipeMonoFat: number,
    @Body('vitaE') recipeMonoFat: number,
    @Body('vitaK') recipeMonoFat: number,
    @Body('water') recipeWater: number*/
  ) {
    const generatedId = await this.recipeService.insertRecipe(
      recipeTitle,
      recipeType,
      recipeAuthor,
      recipeBody,
      recipeIngredient,
      recipeComments,
      recipeUpvotes,
      recipeLikes,
      recipeImage,
      recipeCalories,
      recipeProtein,
      recipeCarbs,
      recipeFat,
      recipeFiber,
      recipeSugar,
      recipeSodium,
      recipeWater,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllRecipes() {
    const products = await this.recipeService.getRecipes();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') recipeId: string) {
    return this.recipeService.getSingleRecipe(recipeId);
  }

  @Post(':id')
  async addComment(
    @Param('id') recipeId: string,
    @Body('body') recipeBody: string,
  ) {
    const generatedId = await this.recipeService.updateComment(
      recipeId,
      recipeBody,
    );
    return { id: generatedId };
  }

  //updateIngredient
  @Post('ingredient/:id')
  async addIngredient(
    @Param('id') recipeId: string,
    @Body('ingredient') recipeIngredient: string,
  ) {
    const generatedId = await this.recipeService.updateIngredient(
      recipeId,
      recipeIngredient,
    );
    console.log(generatedId);
    return { id: generatedId };
  }
}
