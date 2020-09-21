import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recipe extends Document {
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  body: string;
  @Prop()
  ingredients: string;
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
  calories: string;
  @Prop()
  protein: string;
  @Prop()
  carbs: string;
  @Prop()
  fat: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
