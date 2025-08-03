export interface Recipe {
  name: string;
  rarities: Rarity[];
}

export interface Rarity {
  name: string;
  options: Option[];
}

export interface Option {
  verified: boolean;
  ingredients: string[];
}

export interface Meta {
  lastUpdated: string
  totalRecipes: string
}

export interface RecipeMeta {
  recipe: Recipe
  meta: Meta
}