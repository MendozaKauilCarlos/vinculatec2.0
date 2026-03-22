import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { physics } from '../theme/themeEngine';

export const ExpressiveInput = ({ label, type = "text", icon: Icon, initialValue = '', readOnly = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);
  const isActive = isFocused || value.length > 0;

  return (
    <div className={`relative w-full ${readOnly ? 'h-14 mt-4 md:mt-6 rounded-t-[12px]' : 'h-14 md:h-16 rounded-t-xl'} overflow-hidden transition-colors duration-300 bg-[var(--surface-high)] border-b border-[var(--text-muted)]/30 focus-within:border-[var(--primary)]`} style={{ opacity: readOnly ? 0.9 : 1 }}>
      <motion.label animate={{ y: isActive ? 8 : 16, x: Icon ? 44 : 16, scale: isActive ? 0.75 : 1, color: isFocused ? 'var(--primary)' : 'var(--text-muted)' }} className="absolute origin-top-left pointer-events-none font-bold transition-colors duration-300 z-10 text-sm md:text-base">
        {label}
      </motion.label>
      {Icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] z-10"><Icon size={18} className={isFocused ? 'text-[var(--primary)]' : ''} /></div>}
      <input 
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        readOnly={readOnly}
        onFocus={() => !readOnly && setIsFocused(true)} onBlur={() => !readOnly && setIsFocused(false)} onChange={(e) => setValue(e.target.value)} value={value} 
        className={`w-full h-full pt-5 md:pt-6 pb-1 md:pb-2 ${Icon ? 'pl-[44px]' : 'px-4'} pr-12 bg-transparent outline-none font-black text-[var(--text)] relative z-20 text-sm md:text-base`} 
      />
      {type === 'password' && (
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors p-1">
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: isFocused ? 1 : 0 }} className="absolute bottom-[-1px] left-0 w-full h-[2px] origin-center z-20 bg-[var(--primary)]" />
    </div>
  );
};

export const RichTooltip = ({ text, visible }: { text: string, visible: boolean }) => (
  <AnimatePresence>
    {visible && (
      <motion.div initial={{ opacity: 0, scale: 0.5, x: 20 }} animate={{ opacity: 1, scale: 1, x: 40 }} exit={{ opacity: 0, scale: 0.5, x: 20 }} transition={physics.tooltip} className="absolute left-full ml-4 px-4 py-2 rounded-xl bg-[var(--primary-container)] text-[var(--on-primary-container)] font-bold text-sm shadow-xl z-[100] whitespace-nowrap border border-[var(--primary)]/20 transition-colors duration-500">
        {text}
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-[var(--primary-container)] transition-colors duration-500" />
      </motion.div>
    )}
  </AnimatePresence>
);
