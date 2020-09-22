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
