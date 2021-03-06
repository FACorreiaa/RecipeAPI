import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String, required: true },
  ingredients: { type: String, required: true },
  date: { type: Date, required: true },
  comments: [{ body: String, date: Date }],
  upvotes: { type: Number },
  likes: { type: Number },
  image: { type: String },
  calories: { type: Number },
  protein: { type: String },
  carbs: { type: String },
  fat: { type: String },
});

export interface Recipe extends mongoose.Document {
  title: string;
  author: string;
  body: string;
  ingredients: string[];
  date: Date;
  comments: [{ body: string; date: Date }];
  upvotes: number;
  likes: number;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  satFat: number;
  monoFat: number;
  poliFat: number;
  fiber: number;
  sugar: number;
  cholesterol: number;
  sodium: number;
  calcium: number;
  magnesium: number;
  pot: number;
  iron: number;
  zinc: number;
  phosphrous: number;
  vitaA: number;
  vitaC: number;
  thiamin: number;
  riboflavin: number;
  niacin: number;
  vitaB6: number;
  vitaB12: number;
  vitaD: number;
  vitaE: number;
  vitaK: number;
}
