import type { Message } from "discord.js";
import { RecipeUpdateController } from "../controllers/recipeUpdateController";

const OWNER_ID = '692765663470551051'

export class RecipeUpdateCommand {
  static async execute(message: Message) {
    if (message.author.id !== OWNER_ID) {
      return message.reply('❌ You do not have permission to use this command.')
    }
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