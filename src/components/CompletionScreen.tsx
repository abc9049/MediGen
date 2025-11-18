'use client';

import { motion } from 'framer-motion';
import { RotateCcw, Sparkles, Heart } from 'lucide-react';

interface CompletionScreenProps {
  onStartOver: () => void;
  onReplay: () => void;
}

export default function CompletionScreen({ onStartOver, onReplay }: CompletionScreenProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Success Animation */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Celebration Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `hsl(${240 + (i * 30)}, 70%, 60%)`,
                left: `${50 + Math.cos((i * Math.PI) / 6) * 40}%`,
                top: `${50 + Math.sin((i * Math.PI) / 6) * 40}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -30, -60],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Central Success Icon */}
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-indigo/20 to-primary-lavender/20 
                     backdrop-blur-sm border border-primary-indigo/30 flex items-center justify-center mx-auto"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart size={48} className="text-primary-lavender fill-primary-lavender/20" />
        </motion.div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-8 rounded-full bg-primary-indigo/10 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Completion Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6 mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-light text-text-primary">
          Beautiful Work
        </h2>
        
        <p className="text-lg text-text-secondary leading-relaxed max-w-md mx-auto">
          You've completed your meditation journey. Take a moment to notice how you feel now compared to when you started.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center space-x-2 text-primary-lavender"
        >
          <Sparkles size={16} />
          <span className="text-sm">Your transformation is already beginning</span>
          <Sparkles size={16} />
        </motion.div>
      </motion.div>

      {/* Reflection Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-2xl p-6 mb-8"
      >
        <h3 className="text-lg font-medium text-text-primary mb-4">
          Reflection Moment
        </h3>
        <div className="space-y-3 text-text-secondary text-sm">
          <p>• What sensations do you notice in your body right now?</p>
          <p>• How has your emotional state shifted during this session?</p>
          <p>• What insight or feeling would you like to carry forward?</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center"
      >
        <button
          onClick={onReplay}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl
                     bg-glass-bg border border-glass-border
                     text-text-secondary hover:text-text-primary hover:border-primary-indigo/50
                     transition-all duration-300"
        >
          <RotateCcw size={18} />
          <span>Experience Again</span>
        </button>

        <button
          onClick={onStartOver}
          className="flex items-center space-x-2 px-8 py-3 rounded-xl glass-button
                     text-white font-medium transition-all duration-300"
        >
          <Sparkles size={18} />
          <span>Create New Meditation</span>
        </button>
      </motion.div>

      {/* Gratitude Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-text-muted text-sm italic"
      >
        Thank you for choosing to invest in your inner wellbeing.
      </motion.p>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-lavender/20 rounded-full"
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${30 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}