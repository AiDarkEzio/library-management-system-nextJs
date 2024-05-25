import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, type = 'text', value, placeholder, onChange }) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-100">
        {label}
      </label>
      <input
        id={name}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-slate-200"
      />
    </div>
  );
};

export default Input;
