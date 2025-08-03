import { RecipeUpdateService } from "../services/recipeUpdateService";
import type { Meta } from "../types/recipe";
import { countTotalOptions } from "../utils/recipeUtils";
import { RecipeService } from "../services/recipeService";
import { MetaService } from "../services/metaService"

export class RecipeUpdateController {

  static async updateRecipes(): Promise<Meta> {
    const recipeService = new RecipeService()
    const metaService = new MetaService()

    const newRecipes = await RecipeUpdateService.scrapeAlRecipes()

    const meta: Meta = {
      lastUpdated: new Date().toISOString(),
      totalRecipes: countTotalOptions(newRecipes).toString()
    }

    if (newRecipes.length) {
      recipeService.saveAll(newRecipes)
      metaService.save(meta)
    }

    return meta
  }
}