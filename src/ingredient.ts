import { parse } from "recipe-ingredient-parser";

export default class Ingredient {
  private details?: string; // peeled, frozen, etc.
  private preparation?: string; // boiled, baked, etc.

  constructor(origin: string) {

  }
}
