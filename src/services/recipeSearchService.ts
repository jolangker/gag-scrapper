import Fuse from "fuse.js";
import recipes from '../../data/recipes.json'
import type { Recipe } from '../types/recipe'

export class RecipeSearchService {
  private static fuse = new Fuse<Recipe>(recipes, {
    keys: ['name'],
    threshold: 0.4,
    includeScore: true
  })

  static search(query: string): Recipe[] {
    const results = this.fuse.search(query)
    return results.map(r => r.item)
  }
}