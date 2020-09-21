import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MacrosService } from './macros.service';
@Controller('macros')
export class MacrosController {
  constructor(private macroService: MacrosService) {}

  @Get('/list?:ingr')
  getMacros(@Query('ingr') ingr) {
    return this.macroService.getAllNutrients(ingr);
  }

  @Post(':ingr')
  async addMacros(
    @Param('ingr') macroIngr: string,
    @Body('name') macroTitle: string,
    @Body('totalWeight') macroWeight: number,
    @Body('dietLabels') macroLabels: [string],
    @Body('calorieQuantity') macroCalorieQuantity: number,
    @Body('proteinQuantity') macroProteinQuantity: number,
    @Body('carbQuantity') macroCarbQuantity: number,
    @Body('fatQuantity') macroFatQuantity: number,
    @Body('sugarQuantity') macroSugarQuantity: number,
  ) {
    const generatedId = await this.macroService.insertMacrosFromOneIngredient(
      macroIngr,
      macroTitle,
      macroWeight,
      macroLabels,
      macroCalorieQuantity,
      macroProteinQuantity,
      macroCarbQuantity,
      macroFatQuantity,
      macroSugarQuantity,
    );
    return { id: generatedId };
  }
}
