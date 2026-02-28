import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
export default function Products() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <Package className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Our Products</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Browse & Shop</h1>
        <p className="text-muted-foreground mt-2">Premium products with secure Razorpay checkout</p>
      </motion.div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}