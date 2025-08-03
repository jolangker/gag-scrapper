import type { Recipe } from '../types/recipe';

export function countTotalOptions(recipes: Recipe[]): number {
  return recipes.reduce((total, recipe) => {
    return total + recipe.rarities.reduce((rarityTotal, rarity) => {
      return rarityTotal + rarity.options.length;
    }, 0);
  }, 0);
}
