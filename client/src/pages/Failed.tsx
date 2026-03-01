import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";

export default function Failed() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/products");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card border border-gray-400 rounded-2xl p-8 text-center space-y-6"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-red-100"
        >
          <XCircle className="w-10 h-10 text-red-600" />
        </motion.div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Payment Failed
          </h1>
          <p className="text-muted-foreground mt-2">
            Something went wrong while processing your payment
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-secondary/50 rounded-xl p-4 space-y-3 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="text-red-600 font-medium">Failed</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Redirecting</span>
            <span className="text-foreground font-semibold">
              {seconds}s
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/checkout")}
            className="flex-1 px-5 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition flex items-center justify-center gap-2"
          >
            Retry Payment
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="flex-1 px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
}