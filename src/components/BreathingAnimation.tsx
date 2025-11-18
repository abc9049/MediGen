'use client';

import { motion } from 'framer-motion';

interface BreathingAnimationProps {
  isActive: boolean;
}

export default function BreathingAnimation({ isActive }: BreathingAnimationProps) {
  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Outer Ring */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-indigo-500/20"
        animate={isActive ? {
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Middle Ring */}
      <motion.div
        className="absolute w-36 h-36 rounded-full border border-purple-500/30"
        animate={isActive ? {
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      
      {/* Inner Ring */}
      <motion.div
        className="absolute w-24 h-24 rounded-full border border-violet-500/40"
        animate={isActive ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
      
      {/* Center Circle */}
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 backdrop-blur-sm"
        animate={isActive ? {
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        } : {
          scale: 1,
          opacity: 0.6,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Center Glow */}
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-white/30 blur-sm"
        animate={isActive ? {
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Breathing Instructions */}
      <motion.div
        className="absolute top-full mt-12 text-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.p
          className="text-slate-300 text-sm"
          animate={isActive ? {
            opacity: [0.7, 1, 0.7],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {isActive ? "Breathe with the circle" : "Press play to begin"}
        </motion.p>
        
        {isActive && (
          <motion.div
            className="flex justify-center space-x-4 mt-2 text-xs text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Inhale
            </motion.span>
            <span>•</span>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              Exhale
            </motion.span>
          </motion.div>
        )}
      </motion.div>

      {/* Particle Effects */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
              style={{
                left: `${50 + Math.cos((i * Math.PI) / 4) * 25}%`,
                top: `${50 + Math.sin((i * Math.PI) / 4) * 25}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}