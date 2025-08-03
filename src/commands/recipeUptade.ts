import type { Message } from "discord.js";
import { RecipeUpdateController } from "../controllers/recipeUpdateController";

export class RecipeUpdateCommand {
  static async execute(message: Message) {
    const msg = await message.reply({ content: '⏳Updating all recipes from wiki...' })
    try {
      const meta = await RecipeUpdateController.updateRecipes()
      msg.edit({ content: `✅ Successfully updated ${meta.totalRecipes} recipes.` })
    } catch (err: any) {
      console.log(err)
      message.reply(err.message)
    }
  }
}