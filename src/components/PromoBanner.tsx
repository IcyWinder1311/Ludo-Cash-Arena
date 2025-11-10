import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const PromoBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative rounded-2xl overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2070&auto=format&fit=crop"
        alt="Promotional banner"
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-white font-bold text-lg">Weekend Jackpot</h3>
        <p className="text-light-text text-sm mb-2">Win from a prize pool of ₹1,00,000!</p>
        <button className="flex items-center space-x-2 text-gold font-semibold text-sm">
          <span>Join Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default PromoBanner;
