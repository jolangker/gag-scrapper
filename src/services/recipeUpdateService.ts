import type { Option, Recipe } from "../types/recipe";
import * as cheerio from 'cheerio'

export class RecipeUpdateService {
  static async fetchHTML(): Promise<string> {
    const url = "https://growagarden.fandom.com/wiki/Cooking_Event"
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Bun-cheerio-scraper/1.0',
        'Accept': 'text/html',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  }

  static async scrapeAlRecipes(): Promise<Recipe[]> {
    const html = await this.fetchHTML()
    const $ = cheerio.load(html);
    const recipes: Recipe[] = [];

    const section = $('#Cooking_Recipes').parent();

    const tabber = section.nextAll('.tabber');

    tabber.find(".wds-tabs__wrapper").first().find("li").each((_, el) => {
      const name = $(el).find('a').text().trim()
      recipes.push({
        name,
        rarities: [],
      })
    })

    const content = tabber.children().not('.wds-tabs__wrapper');
    content.each((contentIdx, el) => {
      const element = $(el);

      element.find('.tabber').find('.wds-tabs__wrapper').find('li').each((liIdx, li) => {
        const rarity = $(li).find('a').text().trim()

        recipes[contentIdx].rarities.push({
          name: rarity,
          options: [],
        })

        const options: Option[] = []

        const ingredientEl = $(element.find('.tabber').children().not('.wds-tabs__wrapper')[liIdx])
        $(ingredientEl).find('ul').each((ulIdx, ul) => {
          options.push({
            verified: $(ul).find('li').text().includes('✅'),
            ingredients: []
          })

          $(ul).find('li').each((_, li) => {
            options[ulIdx].ingredients.push(
              $(li).text().trim().replace('✅', '').trim(),
            )
          })
        })

        recipes[contentIdx].rarities[liIdx].options = options;
      })
    });

    return recipes;
  }
}