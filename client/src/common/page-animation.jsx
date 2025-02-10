// import React from 'react';
// import { AnimatePresence, motion } from 'framer-motion';

// export default function AnimationWrapper({
//   childern,
//   initial = { opacity: 0 },
//   animate = { opacity: 1 },
//   transition = { duration: 1 },
//   keyValue,
//   className,
// }) {
//   return (
//     <motion.div
//       initial={initial}
//       animate={animate}
//       transition={transition}
//       key={keyValue}
//       className={className}
//     >
//       {childern}
//     </motion.div>
//   );
// }


import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimationWrapper({
  children, // Fixed typo
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
