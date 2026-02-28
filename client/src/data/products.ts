export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Premium noise-cancelling wireless headphones with 30hr battery life.",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 3999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Fitness tracking, heart rate monitor, and notifications on your wrist.",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 1899,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    description: "Handcrafted genuine leather backpack with laptop compartment.",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 3499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    description: "Ultra-lightweight running shoes with responsive cushioning.",
    category: "Footwear",
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 1299,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    description: "Adjustable LED desk lamp with warm and cool light modes.",
    category: "Home",
  },
  {
    id: 6,
    name: "Ceramic Coffee Mug",
    price: 599,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    description: "Hand-painted artisan ceramic mug crafted with care, featuring a comfortable grip and a 350ml capacity perfect for daily use.",
    category: "Home",
  },
];
export default products;