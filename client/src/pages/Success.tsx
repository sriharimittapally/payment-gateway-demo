import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { CheckCircle2, ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";
export default function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const amount = state?.amount || 0;
  const orderId = state?.orderId || "N/A";
  const [showConfetti, setShowConfetti] = useState(true);

   useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      {showConfetti && <Confetti recycle={false} numberOfPieces={250} />}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card border border-gray-400 rounded-2xl p-8 text-center space-y-6"
      >
        {/* Success Icon */}
        
       <motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", delay: 0.2 }}
  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-green-100"
>
  <CheckCircle2 className="w-10 h-10 text-green-600" />
</motion.div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Successful!</h1>
          <p className="text-muted-foreground mt-2">Thank you for your purchase</p>
        </div>
        {/* Transaction Details */}
        <div className="bg-secondary/50 rounded-xl p-4 space-y-3 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment ID</span>
            <span className="text-foreground font-mono text-xs">{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="text-foreground font-bold">₹{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="text-success font-medium">Confirmed</span>
          </div>
        </div>
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 px-5 py-2.5 cursor-pointer border  bg-black text-white rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-all text-sm font-medium flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
          <button
            className="flex-1 px-5 py-2.5 cursor-pointer border rounded-lg text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all"

          >
            <Download className="w-4 h-4" /> Download Receipt
          </button>
        </div>
      </motion.div>
    </div>
  );
}
