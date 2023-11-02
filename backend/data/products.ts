// export type ProductType = {
//   _id: number;
//   name: string;
//   image: string;
//   description: string;
//   brand: string;
//   category: string;
//   price: number;
//   countInStock: number;
//   rating: number;
//   numReviews: number;
// };

const productsData = [
  {
    name: "Apple iPhone 15 Pro Max Blue Titanium",
    image: "/images/product_categories/phones/iphone15.jpg",
    description:
      "Introducing the iPhone 15 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "smart_phones",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Samsung Galaxy Z Flip4 Light Blue",
    image: "/images/product_categories/phones/samsung_fold.jpg",
    description:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Samsung",
    category: "smart_phones",
    price: 599.99,
    countInStock: 7,
    rating: 5.0,
    numReviews: 9,
  },
  {
    name: "OnePlus 10 Pro Emerald Green",
    image: "/images/product_categories/phones/one_plus.jpg",
    description:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "OnePlus",
    category: "smart_phones",
    price: 299.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 8,
  },
  {
    name: "Samsung Galaxy S23 White",
    image: "/images/product_categories/phones/samsung_galaxy2.jpg",
    description:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Samsung",
    category: "smart_phones",
    price: 349.99,
    countInStock: 7,
    rating: 3.0,
    numReviews: 4,
  },
  {
    name: "Samsung Galaxy S22 Ultra Burgundy",
    image: "/images/product_categories/phones/samsung_galaxy.jpg",
    description:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Samsung",
    category: "smart_phones",
    price: 399.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Xiaomi 13 Pro Ceramic Black",
    image: "/images/product_categories/phones/mi.jpg",
    description:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Xaomi",
    category: "smart_phones",
    price: 299.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/product_categories/earphones/airpod.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "earphones",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Noise Buds VS104 Wireless",
    image: "/images/product_categories/earphones/noise.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "earphones",
    price: 15.99,
    countInStock: 10,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "OnePlus Nord Wireless Buds",
    image: "/images/product_categories/earphones/oneplus.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "earphones",
    price: 50.99,
    countInStock: 10,
    rating: 3.5,
    numReviews: 12,
  },

  {
    name: "Sony Alpha ILCE 6100L 24.2 MP Camera",
    image: "/images/product_categories/cameras/sony.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Sony",
    category: "cameras",
    price: 929.99,
    countInStock: 5,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "Fujifilm Instax Square SQ1 Camera",
    image: "/images/product_categories/cameras/fuji.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Fuji",
    category: "cameras",
    price: 675.99,
    countInStock: 7,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Canon Digital Camera EOS R50 RF-S18",
    image: "/images/product_categories/cameras/canon.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Canon",
    category: "cameras",
    price: 929.99,
    countInStock: 2,
    rating: 3.5,
    numReviews: 6,
  },
  {
    name: "Sony Playstation 5 White Version",
    image: "/images/product_categories/game_consoles/playstation.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "game_consoles",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 6,
  },
  {
    name: "MICROMINI X-Ninja D007 Handheld Game",
    image: "/images/product_categories/game_consoles/micromini.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Micromini",
    category: "game_consoles",
    price: 150.99,
    countInStock: 11,
    rating: 4,
    numReviews: 8,
  },
  {
    name: "Xbox Series X Black Game Console",
    image: "/images/product_categories/game_consoles/xbox.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Microsoft",
    category: "game_consoles",
    price: 599.99,
    countInStock: 11,
    rating: 5,
    numReviews: 9,
  },
  {
    name: "Retroid Pocket Flip Retro Game",
    image: "/images/product_categories/game_consoles/retroid.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Retroid",
    category: "game_consoles",
    price: 100.99,
    countInStock: 11,
    rating: 3.5,
    numReviews: 12,
  },
];

export default productsData;
