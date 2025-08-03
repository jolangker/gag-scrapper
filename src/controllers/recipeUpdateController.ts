import { FileService } from "../services/fileService";
import { RecipeUpdateService } from "../services/recipeUpdateService";
import path from 'path'

export class RecipeUpdateController {
  static async updateRecipes(): Promise<void> {
    const newRecipes = await RecipeUpdateService.scrapeAlRecipes()
    const recipesPath = path.resolve(__dirname, '../../data/recipes.json')
    if (newRecipes.length) FileService.writeJSON(recipesPath, newRecipes)
  }
}