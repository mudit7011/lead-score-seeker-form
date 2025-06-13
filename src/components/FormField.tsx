
import { useState } from 'react';

interface FormFieldProps {
  type: 'input' | 'textarea';
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  icon: React.ReactNode;
}

const FormField = ({ type, name, placeholder, value, onChange, icon }: FormFieldProps) => {
  const [focused, setFocused] = useState(false);

  const baseClasses = `
    w-full px-4 py-4 pl-12 bg-white/5 border border-white/10 rounded-xl
    text-white placeholder-white/50 backdrop-blur-sm
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400
    hover:border-white/20 hover:bg-white/10
    ${focused ? 'transform scale-[1.02] shadow-2xl shadow-purple-500/20' : ''}
  `;

  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 group-hover:text-purple-400 transition-colors duration-300 z-10">
        {icon}
      </div>
      {type === 'input' ? (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClasses}
        />
      ) : (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className={`${baseClasses} resize-none`}
        />
      )}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default FormField;
