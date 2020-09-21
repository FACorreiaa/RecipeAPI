import { Body, Controller, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async addRecipe(
    @Body('title') recipeTitle: string,
    @Body('author') recipeAuthor: string,
    @Body('body') recipeBody: string,
    @Body('ingredients') recipeIngredient: string,
    @Body('date') recipeDate: Date,
    @Body('comments') recipeComments: [string, Date],
    @Body('upvotes') recipeUpvotes: number,
    @Body('likes') recipeLikes: number,
    @Body('image') recipeImage: string,
    @Body('calories') recipeCalories: string,
    @Body('protein') recipeProtein: string,
    @Body('carbs') recipeCarbs: string,
    @Body('fat') recipeFat: string,
  ) {
    const generatedId = await this.recipeService.insertRecipe(
      recipeTitle,
      recipeAuthor,
      recipeBody,
      recipeIngredient,
      recipeDate,
      recipeComments,
      recipeUpvotes,
      recipeLikes,
      recipeImage,
      recipeCalories,
      recipeProtein,
      recipeCarbs,
      recipeFat,
    );
    return { id: generatedId };
  }
}
