import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function Failed() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(15);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/cart");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md rounded-2xl border border-gray-300 p-8 text-center"
      >
        {/* Icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="w-7 h-7 text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-foreground mb-2">
          Payment Failed
        </h1>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6">
          Something went wrong while processing your payment.
        </p>

        {/* Countdown */}
        <p className="text-sm font-medium text-foreground">
          Redirecting to cart in{" "}
          <span className="font-bold">{seconds}</span> second
          {seconds !== 1 && "s"}...
        </p>

        {/* Manual button */}
        <button
          onClick={() => navigate("/cart")}
          className="mt-6 w-full py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-secondary transition"
        >
          Go to Cart Now
        </button>
      </motion.div>
    </div>
  );
}