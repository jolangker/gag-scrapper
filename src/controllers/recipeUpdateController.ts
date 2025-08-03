import { FileService } from "../services/fileService";
import { RecipeUpdateService } from "../services/recipeUpdateService";
import path from 'path'
import type { Meta } from "../types/recipe";
import { countTotalOptions } from "../utils/recipeUtils";

export class RecipeUpdateController {
  static async updateRecipes(): Promise<Meta> {
    const newRecipes = await RecipeUpdateService.scrapeAlRecipes()
    const recipesPath = path.resolve(__dirname, '../../data/recipes.json')

    const metaPath = path.resolve(__dirname, '../../data/meta.json')
    const meta: Meta = {
      lastUpdated: new Date().toISOString(),
      totalRecipes: countTotalOptions(newRecipes).toString()
    }

    if (newRecipes.length) {
      FileService.writeJSON(recipesPath, newRecipes)
      FileService.writeJSON(metaPath, meta)
    }

    return meta
  }
}