import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();
  const links = [
    { to: "/", label: "Products" },
    { to: "/cart", label: "Cart" },
  ];
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-9 h-9 rounded-lg flex text-white bg-gray-600 items-center justify-center"
            
          >
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-foreground">DemoShop</span>
        </Link>
        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative border bg-black text-white py-2  px-4 rounded-lg z-10 flex items-center gap-2">
                  {link.label === "Cart" && <ShoppingCart className="w-4 h-4" />}
                  {link.label}
                  {link.label === "Cart" && totalItems > 0 && (
                    <span
                      className="text-xs text-primary-foreground w-4 h-4 bg-white text-black rounded-full flex items-center justify-center font-bold"
                     
                    >
                      {totalItems}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}