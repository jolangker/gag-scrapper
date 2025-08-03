import { RecipeSearchService } from "../services/recipeSearchService";
import type { Recipe } from "../types/recipe";

export class RecipeController {
  static async getRecipe(query: string): Promise<Recipe> {
    const matches = RecipeSearchService.search(query)
    if (!matches.length) {
      throw new Error(`Recipe for ${query} not available.`)
    }
    return matches[0]
  }
}