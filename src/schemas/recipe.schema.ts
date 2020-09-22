import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
@Schema()
export class Recipe extends Document {
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  body: string;
  @Prop()
  ingredients: string[];
  @Prop()
  date: { type: Date; default: Date };
  @Prop()
  comments: [{ body: string; date: Date }];
  @Prop()
  upvotes: number;
  @Prop()
  likes: number;
  @Prop()
  image: string;
  @Prop()
  calories: number;
  @Prop()
  protein: number;
  @Prop()
  carbs: number;
  @Prop()
  fat: number;
  @Prop()
  satFat: number;
  @Prop()
  monoFat: number;
  @Prop()
  poliFat: number;
  @Prop()
  fiber: number;
  @Prop()
  sugar: number;
  @Prop()
  cholesterol: number;
  @Prop()
  sodium: number;
  @Prop()
  calcium: number;
  @Prop()
  magnesium: number;
  @Prop()
  pot: number;
  @Prop()
  iron: number;
  @Prop()
  zinc: number;
  @Prop()
  phosphrous: number;
  @Prop()
  vitaA: number;
  @Prop()
  vitaC: number;
  @Prop()
  thiamin: number;
  @Prop()
  riboflavin: number;
  @Prop()
  niacin: number;
  @Prop()
  vitaB6: number;
  @Prop()
  fold: number;
  @Prop()
  vitaB12: number;
  @Prop()
  vitaD: number;
  @Prop()
  vitaE: number;
  @Prop()
  vitaK: number;
  @Prop()
  water: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
