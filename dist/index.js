"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const recipe_ingredient_parser_1 = require("recipe-ingredient-parser");
const pyScriptPath = "../recipe-scrapers/scrape.py";
const testUrls = [
    "https://www.101cookbooks.com/archives/slow-cooker-miso-ghee-corn-chowder-recipe.html",
    "https://www.jamieoliver.com/recipes/vegetable-recipes/carrot-grain-salad/",
    "https://www.bbc.co.uk/food/recipes/bakedsalmonwithparme_72802",
];
function getIngredients(url) {
    return new Promise((resolve, reject) => {
        child_process_1.exec(`python3 ${pyScriptPath} ${url}`, (_, stdout, stderr) => {
            if (stderr) {
                reject(stderr);
            }
            resolve(stdout.trim().split(/\n/));
        });
    });
}
testUrls.forEach((url) => __awaiter(this, void 0, void 0, function* () {
    getIngredients(url)
        .then((Ingredients) => { Ingredients.forEach((i) => { console.log(recipe_ingredient_parser_1.parse(i)); }); console.log("\n"); })
        .catch((err) => console.log("oops:", err));
}));
