import { EmbedBuilder } from "@discordjs/builders";
import type { Recipe } from "../types/recipe";
import { formatDisplayDate } from "./dateUtils";

export function formatRecipeResponse(recipe: Recipe) {
  const rarityFields = recipe.rarities.map((rarity) => ({
    name: rarity.name,
    value: rarity.options.map((option) => {
      return `${option.ingredients.join(' - ')} ${option.verified ? '✅' : ''}`
    }).join('\n')
  }))

  const embed = new EmbedBuilder()
    .setTitle(`Recipe for ${recipe.name}`)
    .addFields(rarityFields)
    .setColor(0x8B4513)
    .setFooter({
      text: `✅ Confirmed recipes are tested and working.\n⏳ Pending recipes are unverified.\n❌ Failed recipes will be removed soon.\n\nData sourced from Grow a Garden Wiki.`,
    })
    .setURL('https://growagarden.fandom.com/wiki/Cooking_Event')

  return embed
}