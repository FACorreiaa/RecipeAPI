import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Macro } from 'src/schemas/macros.schema';

import axios from 'axios';

@Injectable()
export class MacrosService {
  constructor(
    @InjectModel('Macro') private readonly macroModel: Model<Macro>,
    private httpService: HttpService,
  ) {}

  async getAllNutrients(ingr: string) {
    const headersRequest = {
      'x-rapidapi-host': 'edamam-edamam-nutrition-analysis.p.rapidapi.com',
      'x-rapidapi-key': '5664b75c9fmsh66ac8e054422eb9p1600b8jsn878d097e8d2a',
      useQueryString: true,
    };
    /*const result = await this.httpService.get(
      `https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr`,
      { params: { ingr: ingr.toString() }, headers: headersRequest },
    );*/
    const result = await axios.get(
      'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data',
      { params: { ingr: ingr.toString() }, headers: headersRequest },
    );
    return result.data;
  }

  async insertMacrosFromOneIngredient(
    ingr: string,
    name: string,
    totalWeight: number,
    dietLabels: string[],
    calorieQuantity: number,
    proteinQuantity: number,
    carbQuantity: number,
    fatQuantity: number,
    sugarQuantity: number,
  ) {
    const nutrientList = await this.getAllNutrients(ingr);

    const newMacroList = new this.macroModel({
      name: ingr,
      totalWeight: nutrientList.totalWeight,
      dietLabels: nutrientList.dietLabels,
      calorieQuantity: nutrientList.calories,
      proteinQuantity: nutrientList.totalNutrients.PROCNT.quantity,
      carbQuantity: nutrientList.totalNutrients.CHOCDF.quantity,
      fatQuantity: nutrientList.totalNutrients.FAT.quantity,
      sugarQuantity: nutrientList.totalNutrients.SUGAR.quantity,
    });

    const result = await newMacroList.save();
    return result.id as string;
  }
}
