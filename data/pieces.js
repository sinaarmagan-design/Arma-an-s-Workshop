export const categories = [
  { slug: "all", label: "All" },
  {
    slug: "clothing",
    label: "Clothing",
    subcategories: ["Outerwear", "Tops", "Bottoms", "Knitwear", "Denim"],
  },
  {
    slug: "shoes",
    label: "Shoes",
    subcategories: ["Sneakers", "Boots", "Sandals"],
  },
  {
    slug: "accessories",
    label: "Accessories",
    subcategories: ["Bracelets", "Sunglasses", "Watches", "Bags", "Wallets", "Hats"],
  },
  {
    slug: "vehicles",
    label: "Vehicles",
    subcategories: ["Cars", "Motorcycles"],
  },
];

export const pieces = [
  {
    id: 1,
    brand: "Laurent Ferrier",
    title: "Classic Origin Blue",
    year: 2023,
    price: 34300,
    category: "accessories",
    subcategory: "Watches",
    imageUrl: "/images/Laurent-Ferrier_Classic-Origin-Blue_Watch_LCF036.T.CG_Front-Soldat_FixedTEMP_1000x.webp",
    slug: "laurent-ferrier-classic-origin-blue",
  },
  {
    id: 2,
    brand: "Goyard",
    title: "Saint Sulpice Card Holder",
    year: 2024,
    price: 450,
    category: "accessories",
    subcategory: "Wallets",
    imageUrl: "https://picsum.photos/seed/goyard1/800/1067",
    slug: "goyard-saint-sulpice-card-holder",
  },
  {
    id: 3,
    brand: "Bottega Veneta",
    title: "Intrecciato Leather Bracelet",
    year: 2024,
    price: 390,
    category: "accessories",
    subcategory: "Bracelets",
    imageUrl: "https://picsum.photos/seed/bottega1/800/1067",
    slug: "bottega-veneta-intrecciato-leather-bracelet",
  },
];
