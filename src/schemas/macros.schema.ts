import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Macro extends Document {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  totalWeight: number;
  @Prop()
  dietLabels: string[];
  @Prop()
  calorieQuantity: number;
  @Prop()
  proteinQuantity: number;
  @Prop()
  carbQuantity: number;
  @Prop()
  fatQuantity: number;
  @Prop()
  sugarQuantity: number;
}

export const MacroSchema = SchemaFactory.createForClass(Macro);
