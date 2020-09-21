import { Injectable } from '@nestjs/common';
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
    date: Date,
    comments: [string, Date],
    upvotes: number,
    likes: number,
    image: string,
    calories: string,
    protein: string,
    carbs: string,
    fat: string,
  ) {
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
}
