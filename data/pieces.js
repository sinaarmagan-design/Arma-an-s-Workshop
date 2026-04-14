export const sections = [
  { slug: "men", label: "Men" },
  { slug: "women", label: "Women" },
  { slug: "vehicles", label: "Vehicles" },
  { slug: "house", label: "House" },
  { slug: "tech", label: "Tech" },
];

export const categories = {
  men: [
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
      subcategories: ["Watches", "Bracelets", "Sunglasses", "Wallets", "Bags", "Hats"],
    },
  ],
  women: [
    { slug: "all", label: "All" },
    {
      slug: "clothing",
      label: "Clothing",
      subcategories: ["Outerwear", "Tops", "Bottoms", "Dresses", "Knitwear"],
    },
    {
      slug: "shoes",
      label: "Shoes",
      subcategories: ["Sneakers", "Boots", "Heels", "Sandals"],
    },
    {
      slug: "accessories",
      label: "Accessories",
      subcategories: ["Watches", "Bracelets", "Sunglasses", "Jewellery", "Hats"],
    },
    {
      slug: "leather-goods",
      label: "Leather Goods",
      subcategories: ["Bags", "Wallets", "Belts"],
    },
  ],
  vehicles: [
    { slug: "all", label: "All" },
    {
      slug: "cars",
      label: "Cars",
      subcategories: ["Supercars", "Sports", "Saloon", "SUV", "Classic"],
    },
    {
      slug: "motorcycles",
      label: "Motorcycles",
      subcategories: ["Sport", "Cruiser", "Adventure"],
    },
    {
      slug: "other",
      label: "Other",
      subcategories: ["Boats", "Jets", "Bicycles"],
    },
  ],
  house: [
    { slug: "all", label: "All" },
    {
      slug: "furniture",
      label: "Furniture",
      subcategories: ["Seating", "Tables", "Storage", "Beds"],
    },
    {
      slug: "decor",
      label: "Decor",
      subcategories: ["Art", "Objects", "Candles"],
    },
    {
      slug: "lighting",
      label: "Lighting",
      subcategories: ["Floor Lamps", "Table Lamps", "Ceiling"],
    },
    {
      slug: "textiles",
      label: "Textiles",
      subcategories: ["Cushions", "Throws", "Rugs"],
    },
    {
      slug: "kitchen",
      label: "Kitchen",
      subcategories: ["Cookware", "Tableware", "Glassware"],
    },
  ],
  tech: [
    { slug: "all", label: "All" },
    {
      slug: "audio",
      label: "Audio",
      subcategories: ["Headphones", "Speakers", "Earbuds"],
    },
    {
      slug: "computers",
      label: "Computers",
      subcategories: ["Laptops", "Desktops", "Tablets"],
    },
    {
      slug: "cameras",
      label: "Cameras",
      subcategories: ["Digital", "Film", "Lenses"],
    },
    {
      slug: "gadgets",
      label: "Gadgets",
      subcategories: ["Wearables", "Smart Home", "Phones"],
    },
  ],
};

export const pieces = [
  {
    id: 1,
    section: "men",
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
    section: "men",
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
    section: "men",
    brand: "Bottega Veneta",
    title: "Knot Leather Bracelet",
    year: 2024,
    price: 600,
    category: "accessories",
    subcategory: "Bracelets",
    imageUrl: "/images/Large-796597VAHUA6356_A.avif",
    slug: "bottega-veneta-knot-leather-bracelet",
  },
  {
    id: 4,
    section: "men",
    brand: "Bottega Veneta",
    title: "Curl Leather Bracelet",
    year: 2024,
    price: 750,
    category: "accessories",
    subcategory: "Bracelets",
    imageUrl: "/images/Large-839821VAHUA6244_A.avif",
    slug: "bottega-veneta-curl-leather-bracelet",
  },
];
