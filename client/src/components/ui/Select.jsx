function Select({ options = [], className = "", ...props }) {
  return (
    <select
      className={`
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          px-4
          py-3
          text-white
          focus:border-indigo-500
          focus:outline-none
          ${className}
        `}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
