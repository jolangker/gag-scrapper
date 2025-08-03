import fs from "fs/promises";
import path from "path";
import type { Recipe } from "../types/recipe";
import { FileService } from "./fileService";

export class RecipeService {
  private recipesPath: string;

  constructor() {
    this.recipesPath = path.resolve(process.cwd(), "data/recipes.json");
  }

  async getAll(): Promise<Recipe[]> {
    return await FileService.readJSON(this.recipesPath)
  }

  async saveAll(recipes: Recipe[]): Promise<void> {
    await FileService.writeJSON(this.recipesPath, recipes)
  }
}
