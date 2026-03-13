import { motion, useScroll, useTransform } from 'motion/react';

export default function NeonWater() {
  const { scrollY } = useScroll();
  
  // Slosh effect based on scroll
  const skewX = useTransform(scrollY, [0, 1000], [0, 5]);
  const yOffset = useTransform(scrollY, [0, 1000], [0, -40]);

  return (
    <motion.div 
      style={{ skewX, y: yOffset }}
      className="fixed bottom-0 left-0 right-0 h-[40vh] z-0 pointer-events-none overflow-hidden opacity-20"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 to-transparent" />
      
      {/* Wave 1 */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-[200%] h-[100px]"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 88.7\'%3E%3Cpath d=\'M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z\' fill=\'%230284c7\' fill-opacity=\'0.15\'/%3E%3C/svg%3E")',
          backgroundSize: '50% 100%',
          filter: 'drop-shadow(0 0 10px rgba(2, 132, 199, 0.2))'
        }}
      />
      
      {/* Wave 2 */}
      <motion.div
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-[200%] h-[120px]"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 88.7\'%3E%3Cpath d=\'M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z\' fill=\'%232563eb\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")',
          backgroundSize: '50% 100%',
          filter: 'drop-shadow(0 0 15px rgba(37, 99, 235, 0.2))'
        }}
      />
      
      {/* Wave 3 */}
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-[200%] h-[150px]"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 88.7\'%3E%3Cpath d=\'M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z\' fill=\'%233b82f6\' fill-opacity=\'0.25\'/%3E%3C/svg%3E")',
          backgroundSize: '50% 100%',
          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
        }}
      />
    </motion.div>
  );
}
