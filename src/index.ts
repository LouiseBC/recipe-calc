import { exec } from "child_process";
import { parse } from "recipe-ingredient-parser";

const pyScriptPath = "../recipe-scrapers/scrape.py";
const testUrls = [
  "https://www.101cookbooks.com/archives/slow-cooker-miso-ghee-corn-chowder-recipe.html",
  "https://www.jamieoliver.com/recipes/vegetable-recipes/carrot-grain-salad/",
  "https://www.bbc.co.uk/food/recipes/bakedsalmonwithparme_72802",
];

function getIngredients(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    exec(`python3 ${pyScriptPath} ${url}`, (_, stdout: string, stderr: string) => {
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout.trim().split(/\n/));
    });
  });
}

testUrls.forEach(async (url) => {
  getIngredients(url)
    .then((Ingredients) => { Ingredients.forEach((i) => {console.log(parse(i))}); console.log("\n"); })
    .catch((err) => console.log("oops:", err));
});
