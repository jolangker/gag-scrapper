import type { Message } from "discord.js";
import type { Recipe } from "../types/recipe";
import { RecipeController } from "../controllers/recipeController";
import { formatRecipeResponse } from "../utils/formatResponse";
import { MetaService } from "../services/metaService";

export class RecipeCommand {
  static async execute(message: Message, args: string[]) {
    const channel = message.channel

    if (channel && channel.isTextBased() && channel.isSendable()) {
      channel.sendTyping()
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    if (args.length === 0) {
      return message.reply('Please provide recipe name, example: `!recipe Salad`')
    }

    const metaService = new MetaService()
    const name = args.join(' ')

    try {
      const recipe: Recipe = await RecipeController.getRecipe(name)
      const meta = await metaService.get()
      const embed = formatRecipeResponse(recipe, meta)
      message.reply({ embeds: [embed] })
    } catch (err: any) {
      message.reply(err.message)
    }
  }
}