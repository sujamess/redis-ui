import { ChangeEvent, FunctionComponent } from "react";

interface Input {
  type: 'text' | 'email' | 'password' | 'number';
  label: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<Input> = ({ type, label, placeholder, required, min, max, value, onChange }: Input) => {
  return (
    <div>
      <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
      <input
        type={type}
        id={label.toLowerCase()}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
