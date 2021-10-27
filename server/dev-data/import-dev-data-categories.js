import Category from "../models/category.js";
import Pattern from "../models/pattern.js";
import Style from "../models/style.js";
// Categories
const ladies = new Category({
  name: "Ladies",
  categories: [],
});
const men = new Category({
  name: "Men",
  categories: [],
});
const girls = new Category({
  name: "Girls",
  categories: [],
});
const boys = new Category({
  name: "Boys",
  categories: [],
});

// pattern
const top = new Pattern({
  name: "Tops",
  categories: [],
  category: ladies
});
