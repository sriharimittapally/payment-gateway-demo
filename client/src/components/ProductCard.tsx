import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();
  const inCart = cart.some((item) => item.id === product.id);
  const handleClick = () => {
    if (inCart) {
      navigate("/cart");
    } else {
      addToCart(product);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-xl overflow-hidden border border-gray-200 group"
    >
      {/* Image */}
     <div className="relative overflow-hidden aspect-square flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black text-white border border-gray-100 backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </div>
      {/* Info */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-foreground text-base">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold gradient-text border px-4 py-1.5 rounded-lg">₹{product.price.toLocaleString()}</span>
          <button
            onClick={handleClick}
            className={`flex items-center cursor-pointer border gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
              inCart
                ? "bg-success/20 bg-black  text-white text-success border border-success/30 hover:bg-success/30"
                : "text-primary-foreground hover:opacity-90"
            }`}
            style={!inCart ? { background: "bg-white" } : undefined}
          >
            {inCart ? (
              <>Go to Cart <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Add <ShoppingCart className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
