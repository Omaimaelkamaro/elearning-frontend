import * as React from "react";

const Checkbox = React.forwardRef(({ className = "", checked, onChange, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
