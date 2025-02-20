


import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimationWrapper({
  children, 
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 }, // Added exit animation for AnimatePresence
  transition = { duration:  0.5},
  keyValue,
  className,
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        key={keyValue} // This key should be placed correctly if using a list
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
