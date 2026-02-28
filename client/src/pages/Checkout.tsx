import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Lock,  CreditCard, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const gst = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + gst;
 const handlePayment = async () => {
  if (cart.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }

  try {
    // 1️⃣ Create order
    const { data: order } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-order`,
      { amount: grandTotal }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "DemoShop",
      description: `Payment for ${cart.length} item(s)`,
      theme: { color: "#3B82F6" },

      // 2️⃣ Payment success handler
      handler: async function (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) {
        try {
          const { data: result } = await axios.post(
            `${import.meta.env.VITE_API_URL}/verify-payment`,
            response
          );

          if (result.status === "success") {
            clearCart();
            navigate("/success", {
              state: {
                amount: grandTotal,
                orderId: response.razorpay_payment_id,
              },
            });
          } else {
            toast.error("Payment verification failed!");
          }
        } catch {
          toast.error("Verification error. Contact support.");
        }
      },

      modal: {
  ondismiss: () => {
    toast.error("Payment cancelled"),
    navigate("/failed", { state: { reason: "cancelled" } });
  },
},
    };

    // @ts-ignore Razorpay global
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Could not initiate payment. Is the backend running?");
  }
};
  if (cart.length === 0) {
    return null;
  }
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl border border-gray-300 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Checkout</h1>
              <p className="text-sm text-muted-foreground">Review your order and pay securely</p>
            </div>
          </div>
        </div>
        {/* Order Items */}
        <div className="p-6 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Order Items</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border gap-3 p-3 rounded-lg bg-secondary/50">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-foreground text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>
        {/* Price Summary */}
        <div className="px-6 pb-6 space-y-2">
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>GST (18%)</span><span>₹{gst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-border">
              <span>Total</span><span>₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
          {/* Pay Button */}
          <button
            onClick={handlePayment}
            className="w-full py-3.5 rounded-lg cursor-pointer text-white font-semibold text-primary-foreground text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all mt-4"
            style={{ background: "black" }}
          >
            <Lock className="w-4 h-4" /> Pay ₹{grandTotal.toLocaleString()} with Razorpay
          </button>

        </div>
      </motion.div>
    </div>
  );
}