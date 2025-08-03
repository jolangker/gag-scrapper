import type { Message } from "discord.js";
import { RecipeUpdateController } from "../controllers/recipeUpdateController";

export class RecipeUpdateCommand {
  static async execute(message: Message) {
    try {
      await RecipeUpdateController.updateRecipes()
      message.reply({ content: `✅ Successfully updating all recipes.` })
    } catch (err: any) {
      message.reply(err.message)
    }
  }
}