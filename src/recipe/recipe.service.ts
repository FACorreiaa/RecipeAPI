import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MacrosService } from 'src/macros/macros.service';

import { Recipe } from '../schemas/recipe.schema';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
    private macroService: MacrosService,
  ) {}

  async insertRecipe(
    title: string,
    type: string,
    author: string,
    body: string,
    ingredients: string[],
    likes: number,
    image: string,
    calories: number,
    protein: number,
    carbs: number,
    fat: number,
    fiber: number,
    sugar: number,
    sodium: number,
    water: number,
  ) {
    const date: Date = new Date();

    const newRecipe = new this.recipeModel({
      title,
      type,
      author,
      body,
      ingredients,
      date,
      likes,
      image,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      sugar,
      sodium,
      water,
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
      type: recipe.type,
      ingredients: recipe.ingredients,
      comments: recipe.comments,
      hash: recipe.hash,
      likes: recipe.likes,
      image: recipe.image,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      fiber: recipe.fiber,
      sugar: recipe.sugar,
      sodium: recipe.sodium,
      water: recipe.water,
      calcium: recipe.calcium,
      date: recipe.date,
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
      hash: recipe.hash,
      likes: recipe.likes,
      image: recipe.image,
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      calcium: recipe.calcium,
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

  async updateLike(id: string) {
    const updateLike = await this.findRecipe(id);
    updateLike.likes += 1;
    const result = await updateLike.save();
    return result;
  }

  async updateIngredient(id: string, ingredient: string) {
    const updateIngredient = await this.findRecipe(id);
    updateIngredient.ingredients.push(ingredient);
    const value = await this.macroService.getAllNutrients(ingredient);
    console.log(updateIngredient);
    console.log(value);
    updateIngredient.calories += value.calories;

    updateIngredient.protein += parseFloat(
      value.totalNutrients.PROCNT.quantity,
    );
    updateIngredient.carbs += parseFloat(value.totalNutrients.CHOCDF.quantity);
    updateIngredient.fat += parseFloat(value.totalNutrients.FAT.quantity);
    updateIngredient.sodium += parseInt(value.totalNutrients.NA.quantity);

    /*
    updateIngredient.satFat += parseFloat(value.totalNutrients.FASAT.quantity);
    updateIngredient.monoFat += parseFloat(value.totalNutrients.FAMS.quantity);
    updateIngredient.poliFat += parseFloat(value.totalNutrients.FAPU.quantity);
    updateIngredient.fiber += parseFloat(value.totalNutrients.FIBTG.quantity);
    updateIngredient.sugar += parseFloat(value.totalNutrients.SUGAR.quantity);
    updateIngredient.cholesterol += parseFloat(
      value.totalNutrients.CHOLE.quantity,
    );
    updateIngredient.sodium += parseFloat(value.totalNutrients.NA.quantity);
    updateIngredient.calcium += parseFloat(value.totalNutrients.CA.quantity);
    updateIngredient.magnesium += parseFloat(value.totalNutrients.MG.quantity);
    updateIngredient.pot += parseFloat(value.totalNutrients.K.quantity);
    updateIngredient.iron += parseFloat(value.totalNutrients.FE.quantity);
    updateIngredient.zinc += parseFloat(value.totalNutrients.ZN.quantity);
    updateIngredient.phosphrous += parseFloat(value.totalNutrients.P.quantity);
    updateIngredient.vitaA += parseFloat(
      value.totalNutrients.VITA_RAE.quantity,
    );
    updateIngredient.vitaC += parseFloat(value.totalNutrients.VITC.quantity);
    updateIngredient.thiamin += parseFloat(value.totalNutrients.THIA.quantity);
    updateIngredient.riboflavin += parseFloat(
      value.totalNutrients.RIBF.quantity,
    );
    updateIngredient.niacin += parseFloat(value.totalNutrients.NIA.quantity);
    updateIngredient.vitaB6 += parseFloat(value.totalNutrients.VITB6A.quantity);
    updateIngredient.fold += parseFloat(value.totalNutrients.FOLDFE.quantity);
    updateIngredient.vitaB12 += parseFloat(
      value.totalNutrients.VITB12.quantity,
    );
    updateIngredient.vitaD += parseFloat(value.totalNutrients.VITD.quantity);
    updateIngredient.vitaE += parseFloat(value.totalNutrients.TOCPHA.quantity);
    updateIngredient.vitaK += parseFloat(value.totalNutrients.VITK1.quantity);
    updateIngredient.water += parseFloat(value.totalNutrients.WATER.quantity);
    */
    const result = await updateIngredient.save();
    return result;
  }

  private async findRecipe(id: string): Promise<Recipe> {
    let recipe;
    try {
      recipe = await this.recipeModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('could not find recipe');
    }
    if (!recipe) {
      throw new NotFoundException('could not find recipe');
    }
    return recipe;
  }
}
