import Fuse from "fuse.js";
import recipes from '../../data/recipes.json'
import type { Recipe } from '../types/recipe'
import { RecipeService } from "./recipeService";

export class RecipeSearchService {
  static async search(query: string): Promise<Recipe[]> {
    const recipeService = new RecipeService()
    const recipes = await recipeService.getAll()
    const fuse = new Fuse<Recipe>(recipes, {
      keys: ['name'],
      threshold: 0.4,
      includeScore: true
    })
    const results = fuse.search(query)
    return results.map(r => r.item)
  }
}