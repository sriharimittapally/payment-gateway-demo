import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some products to get started!</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center cursor-pointer gap-2 border px-6 py-3 rounded-lg text-primary-foreground font-medium text-sm hover:opacity-90 transition-all"
          
          >
            <ArrowLeft className="w-4 h-4" /> Browse Products
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-foreground mb-6">
        Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
      </motion.h1>
      <div className="space-y-4">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="glass-card rounded-xl p-4 border border-gray-300 flex items-center gap-4"
            >
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 sm:block">₹{item.price.toLocaleString()} each</p>
              </div>
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 cursor-pointer rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 cursor-pointer h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="font-bold text-foreground w-24 text-right">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="w-9 cursor-pointer h-9 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Summary */}
      <motion.div layout className="glass-card rounded-xl border border-gray-400 p-6 mt-6 space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>GST (18%)</span>
          <span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border">
          <span>Total</span>
          <span>₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="w-full py-3.5 text-white rounded-lg font-semibold cursor-pointer text-primary-foreground text-sm flex items-center  justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
          style={{ background: "black" }}
        >
          Proceed to Checkout <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}