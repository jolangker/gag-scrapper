import { EmbedBuilder } from "@discordjs/builders";
import type { Meta, Recipe } from "../types/recipe";
import { formatDisplayDate } from "./dateUtils";

export function formatRecipeResponse(recipe: Recipe, meta: Meta) {
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
    .setURL('https://growagarden.fandom.com/wiki/Cooking_Event')
    .setFooter({
      text: `✅ Confirmed recipes are tested and working.\n⏳ Pending recipes are unverified.\n❌ Failed recipes will be removed soon.\n\nData sourced from Grow a Garden Wiki.\nLast updated on ${formatDisplayDate(meta.lastUpdated)}`,
    })

  return embed
}