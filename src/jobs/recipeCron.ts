import cron from "node-cron";
import { Client, TextChannel } from "discord.js";
import { RecipeService } from "../services/recipeService";
import { MetaService } from "../services/metaService";
import { countTotalOptions } from "../utils/recipeUtils";
import { RecipeUpdateService } from "../services/recipeUpdateService";

export function setupRecipeCron(client: Client) {
  const recipeService = new RecipeService();
  const metaService = new MetaService();

  const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID!;

  cron.schedule("0 * * * *", async () => {
    console.log("[Cron] Running auto recipe update...");

    try {
      const newRecipes = await RecipeUpdateService.scrapeAlRecipes();
      await recipeService.saveAll(newRecipes);

      await metaService.save({
        lastUpdated: new Date().toISOString(),
        totalRecipes: countTotalOptions(newRecipes).toString()
      });

      const channel = client.channels.cache.get(LOG_CHANNEL_ID) as TextChannel;
      if (channel) {
        await channel.send(`✅ Auto-update complete. Total recipes: ${countTotalOptions(newRecipes)}`);
      }

      console.log("[Cron] Auto recipe update success.");
    } catch (err) {
      console.error("[Cron] Auto update failed:", err);
    }
  });
}
