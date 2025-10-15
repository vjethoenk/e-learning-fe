interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField = ({ id, label, ...props }: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-cyan-600 focus:ring focus:ring-cyan-200 outline-none"
    />
  </div>
);

export default InputField;
