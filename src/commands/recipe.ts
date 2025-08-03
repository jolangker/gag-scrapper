import type { Message } from "discord.js";
import type { Meta, Recipe } from "../types/recipe";
import { RecipeController } from "../controllers/recipeController";
import { formatRecipeResponse } from "../utils/formatResponse";
import meta from '../../data/meta.json'

export class RecipeCommand {
  static async execute(message: Message, args: string[]) {
    if (args.length === 0) {
      return message.reply('Please provide recipe name, example: `!recipe Salad`')
    }
    const name = args.join(' ')
    try {
      const recipe: Recipe = await RecipeController.getRecipe(name)
      const embed = formatRecipeResponse(recipe, meta)
      message.reply({ embeds: [embed] })
    } catch (err: any) {
      message.reply(err.message)
    }
  }
}