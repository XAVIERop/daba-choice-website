import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-3xl max-w-lg w-full mx-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
        </motion.div>
        
        <h1 className="font-display text-3xl font-bold mb-4">ORDER CONFIRMED</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for choosing Daba Choice. Your authentic Punjabi meal is being prepared and will be with you shortly.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="gold-button w-full block py-3 rounded-xl">
            Return to Home
          </Link>
          <p className="text-xs text-muted-foreground">
            Our team has received your request via WhatsApp and will confirm shortly.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
