import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
  ) {}

  async insertRecipe(
    title: string,
    author: string,
    body: string,
    ingredients: string,
    comments: [string, Date],
    upvotes: number,
    likes: number,
    image: string,
    calories: string,
    protein: string,
    carbs: string,
    fat: string,
  ) {
    const date: Date = new Date();

    const newRecipe = new this.recipeModel({
      title,
      author,
      body,
      ingredients,
      date,
      comments,
      upvotes,
      likes,
      image,
      calories,
      protein,
      carbs,
      fat,
    });
    const result = await newRecipe.save();
    return result.id as string;
  }

  async getRecipes() {
    const recipes = await this.recipeModel.find().exec();
    return recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      author: recipe.author,
      body: recipe.body,
      comments: recipe.comments,
      upvotes: recipe.upvotes,
      likes: recipe.likes,
      image: recipe.image,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
    }));
  }

  async getSingleRecipe(productId: string) {
    const recipe = await this.findRecipe(productId);
    return {
      id: recipe.id,
      title: recipe.title,
      author: recipe.author,
      body: recipe.body,
      comments: recipe.comments,
      upvotes: recipe.upvotes,
      likes: recipe.likes,
      image: recipe.image,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
    };
  }

  async updateComment(id: string, body: string) {
    const updatedComment = await this.findRecipe(id);
    const date: Date = new Date();
    updatedComment.comments.push({
      body,
      date,
    });
    const result = await updatedComment.save();
    return result;
  }

  private async findRecipe(id: string): Promise<Recipe> {
    console.log(id);
    let recipe;
    try {
      recipe = await this.recipeModel.findById(id).exec();
      console.log(recipe);
    } catch (error) {
      throw new NotFoundException('could not find recipe');
    }
    if (!recipe) {
      throw new NotFoundException('could not find recipe');
    }
    return recipe;
  }
}
